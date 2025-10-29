import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface FilterSectionProps {
  children: ReactNode;
  onReset: () => void;
  onSearch: () => void;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function FilterSection({ children, onReset, onSearch, isExpanded = true, onToggle }: FilterSectionProps) {
  return (
    <Card className="border-green-200 shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Bộ lọc tìm kiếm</h3>
            </div>
            {onToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-gray-600 hover:text-gray-900"
              >
                {isExpanded ? 'Thu gọn' : 'Mở rộng'}
              </Button>
            )}
          </div>

          {isExpanded && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {children}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={onSearch}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-md"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Tìm kiếm
                </Button>
                <Button
                  onClick={onReset}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Đặt lại
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
