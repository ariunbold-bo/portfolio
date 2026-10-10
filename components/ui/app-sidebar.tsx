import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="p-2">
        <SidebarHeader>Hello world</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>yo</SidebarGroup>
          <SidebarGroup>yo</SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </div>
    </Sidebar>
  );
}
