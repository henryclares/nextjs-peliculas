import { BaseTemplate } from "@/templates/BaseTemplate";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <BaseTemplate>
      <div className="flex flex-col items-center justify-center h-min gap-6 py-2">
        {props.children}
      </div>
    </BaseTemplate>
  );
}
