import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Link, useLocation } from "react-router-dom";
import { LayoutGridIcon, StarIcon, CreativeCommons } from "lucide-react";
import { cn } from "@/shared/lib/css";

interface BoardsSidebarProps {
  className?: string;
}

export function BoardsSidebar({ className }: BoardsSidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("w-64 border-r p-4 space-y-4", className)}>
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-500 px-2">Навигация</div>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link
            className={`${
              location.pathname === ROUTES.BOARDS
                ? "border-2"
                : "border-2 border-transparent"
            }`}
            to={ROUTES.BOARDS}
          >
            <LayoutGridIcon className="mr-2 h-4 w-4" />
            Все доски
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link
            className={`${
              location.pathname === ROUTES.FAVORITE_BOARDS
                ? "border-2"
                : "border-2 border-transparent"
            }`}
            to={ROUTES.FAVORITE_BOARDS}
          >
            <StarIcon className="mr-2 h-4 w-4" />
            Избранное
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link
            className={`${
              location.pathname === ROUTES.CREATE_BOARDS
                ? "border-2"
                : "border-2 border-transparent"
            }`}
            to={ROUTES.CREATE_BOARDS}
          >
            <CreativeCommons className="mr-2 h-4 w-4" />
            Создать доску
          </Link>
        </Button>
      </div>
    </div>
  );
}
