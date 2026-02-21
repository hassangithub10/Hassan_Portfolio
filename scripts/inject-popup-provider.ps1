$pages = @(
    "src\app\letmein\(dashboard)\services\page.tsx",
    "src\app\letmein\(dashboard)\sections\skills\page.tsx",
    "src\app\letmein\(dashboard)\sections\experience\page.tsx",
    "src\app\letmein\(dashboard)\sections\education\page.tsx",
    "src\app\letmein\(dashboard)\sections\blogs\page.tsx",
    "src\app\letmein\(dashboard)\sections\projects\page.tsx",
    "src\app\letmein\(dashboard)\sections\services\page.tsx"
)

$popupImport = 'import { usePopup } from "@/components/admin/PopupProvider";'

foreach ($page in $pages) {
    $path = Join-Path "e:\Musa Projects\Hassanport" $page
    if (-not (Test-Path $path)) { Write-Host "SKIP (not found): $page"; continue }
    
    $content = Get-Content $path -Raw
    
    if ($content -match "usePopup") { Write-Host "SKIP (already has usePopup): $page"; continue }

    # Add import after clsx import or after first import block
    if ($content -match 'import \{ clsx \} from "clsx";') {
        $content = $content -replace '(import \{ clsx \} from "clsx";)', "`$1`r`n$popupImport"
    } elseif ($content -match 'import \{[^}]+\} from "@heroicons') {
        # Add after last heroicons import
        $content = $content -replace '(import \{[^}]+\} from "@heroicons[^;]+;)(?![\s\S]*import \{[^}]+\} from "@heroicons)', "`$1`r`n$popupImport"
    }

    # Add usePopup hook call inside the first component function
    # Find the first 'const [' and add popup hook before it
    $content = $content -replace "(export default function \w+\(\) \{[\r\n]+)", "`$1    const popup = usePopup();`r`n"

    # Replace confirm() + alert() patterns for delete
    $content = $content -replace "const handleDelete = async \(id: number\) => \{[\r\n]+\s+if \(!confirm\(`"[^`"]+`"\)\) return;[\r\n]+[\r\n]+\s+const res = await (\w+)\(id\);[\r\n]+\s+if \(res\.success\) \{[\r\n]+\s+set(\w+)\((\w+)\.filter\([a-z] => [a-z]\.id !== id\)\);[\r\n]+\s+\} else \{[\r\n]+\s+alert\(res\.message\);[\r\n]+\s+\}[\r\n]+\s+\};", @"
    const handleDelete = (id: number, title: string) => {
        popup.confirm({
            title: "Delete Item?",
            message: `"`$1"` will be permanently removed.`,
            onConfirm: async () => {
                const res = await `$1(id);
                if (res.success) {
                    set`$2(`$3.filter(s => s.id !== id));
                    popup.deleted("Item Deleted", "The item has been removed.");
                } else {
                    popup.error("Deletion Failed", res.message);
                }
            },
        });
    };
"@

    # Replace simple alert(res.message) in toggleVisibility
    $content = $content -replace "\s+alert\(res\.message\);", "`r`n            popup.error(`"Update Failed`", res.message);"

    Set-Content $path $content -NoNewline -Encoding UTF8
    Write-Host "Updated: $page"
}
Write-Host "Done!"
