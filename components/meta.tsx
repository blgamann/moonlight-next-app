import { GoComment, GoInfinity } from "react-icons/go";
import { TextGrey } from "./text";

export function MetaAnswers({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      <GoComment className="text-gray-500" />
      <TextGrey className="text-sm">{count}</TextGrey>
    </div>
  );
}

export function MetaSoullinks({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      <GoInfinity className="text-gray-500" />
      <TextGrey className="text-sm">{count}</TextGrey>
    </div>
  );
}

export function MetaComponents() {
  return (
    <div className="flex flex-col items-center gap-4">
      <MetaAnswers count={10} />
      <MetaSoullinks count={10} />
    </div>
  );
}
