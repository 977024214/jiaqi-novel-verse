import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUserStore } from '@/lib/store'

const fontFamilies = [
  { value: 'system-ui', label: '系统默认' },
  { value: 'serif', label: '宋体' },
  { value: 'sans-serif', label: '黑体' },
  { value: 'monospace', label: '等宽字体' },
]

export function ReaderSettings() {
  const { preferences, updatePreferences } = useUserStore()

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <Label>字体大小</Label>
        <div className="flex items-center space-x-4">
          <Slider
            value={[preferences.fontSize]}
            onValueChange={([value]) => updatePreferences({ fontSize: value })}
            min={12}
            max={24}
            step={1}
          />
          <span className="w-12 text-right">{preferences.fontSize}px</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>行高</Label>
        <div className="flex items-center space-x-4">
          <Slider
            value={[preferences.lineHeight * 10]}
            onValueChange={([value]) =>
              updatePreferences({ lineHeight: value / 10 })
            }
            min={10}
            max={25}
            step={1}
          />
          <span className="w-12 text-right">{preferences.lineHeight}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>字体</Label>
        <Select
          value={preferences.fontFamily}
          onValueChange={(value) => updatePreferences({ fontFamily: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="选择字体" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() =>
            updatePreferences({
              fontSize: 16,
              lineHeight: 1.6,
              fontFamily: 'system-ui',
            })
          }
        >
          重置
        </Button>
      </div>
    </div>
  )
}