import OrgControl from "@/components/organization/OrgControl"

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <OrgControl/>
          {children}
        </>
    )
}

export default OrganizationIdLayout