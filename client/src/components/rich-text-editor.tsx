import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  Link, 
  Image, 
  Quote, 
  List, 
  ListOrdered,
  Code,
  Heading1,
  Heading2,
  Type
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Tell your story..." }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedText, setSelectedText] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(300, textarea.scrollHeight) + 'px';
    }
  }, [value]);

  const handleSelection = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = value.substring(start, end);
      
      setSelectedText(selected);
      setCursorPosition({ start, end });
    }
  };

  const insertFormatting = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = cursorPosition.start;
    const end = cursorPosition.end;
    const beforeText = value.substring(0, start);
    const selectedText = value.substring(start, end);
    const afterText = value.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    const newCursorPos = start + before.length + selectedText.length + after.length;

    onChange(newText);
    
    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = cursorPosition.start;
    const beforeText = value.substring(0, start);
    const afterText = value.substring(cursorPosition.end);

    const newText = beforeText + text + afterText;
    const newCursorPos = start + text.length;

    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatBold = () => insertFormatting("**", "**");
  const formatItalic = () => insertFormatting("_", "_");
  const formatCode = () => insertFormatting("`", "`");
  const formatQuote = () => insertFormatting("> ", "");
  const formatH1 = () => insertFormatting("# ", "");
  const formatH2 = () => insertFormatting("## ", "");
  const formatList = () => insertFormatting("- ", "");
  const formatOrderedList = () => insertFormatting("1. ", "");

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      const linkText = selectedText || "Link text";
      insertFormatting(`[${linkText}](${url})`, "");
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    const alt = prompt("Enter alt text (optional):");
    if (url) {
      insertAtCursor(`![${alt || "Image"}](${url})`);
    }
  };

  const toolbarButtons = [
    { icon: Bold, action: formatBold, tooltip: "Bold", shortcut: "Ctrl+B" },
    { icon: Italic, action: formatItalic, tooltip: "Italic", shortcut: "Ctrl+I" },
    { icon: Code, action: formatCode, tooltip: "Code", shortcut: "Ctrl+`" },
    { divider: true },
    { icon: Heading1, action: formatH1, tooltip: "Heading 1" },
    { icon: Heading2, action: formatH2, tooltip: "Heading 2" },
    { divider: true },
    { icon: Quote, action: formatQuote, tooltip: "Quote" },
    { icon: List, action: formatList, tooltip: "Bullet List" },
    { icon: ListOrdered, action: formatOrderedList, tooltip: "Numbered List" },
    { divider: true },
    { icon: Link, action: insertLink, tooltip: "Insert Link" },
    { icon: Image, action: insertImage, tooltip: "Insert Image" },
  ];

  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-secondary/20">
      {/* Toolbar */}
      <div className="border-b border-border/50 p-4">
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          {toolbarButtons.map((button, index) => {
            if (button.divider) {
              return <Separator key={index} orientation="vertical" className="h-6" />;
            }
            
            const Icon = button.icon!;
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                className="p-2 hover:bg-accent/50 transition-colors"
                title={`${button.tooltip}${button.shortcut ? ` (${button.shortcut})` : ""}`}
                data-testid={`button-format-${button.tooltip?.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="w-4 h-4" />
              </Button>
            );
          })}
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onSelect={handleSelection}
          onKeyUp={handleSelection}
          placeholder={placeholder}
          className="min-h-[300px] border-none bg-transparent text-lg leading-relaxed placeholder-muted-foreground resize-none focus-visible:ring-0 font-mono"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          data-testid="textarea-rich-editor"
        />
        
        {/* Helper Text */}
        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          Markdown supported
        </div>
      </div>

      {/* Preview Mode Toggle */}
      <div className="border-t border-border/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Markdown formatting supported</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-formatting-help"
            >
              <Type className="w-4 h-4 mr-2" />
              Formatting Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
