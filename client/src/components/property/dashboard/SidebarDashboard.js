"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/auth";

const SidebarDashboard = () => {
  const pathname = usePathname();
  const { logoutUser } = useAuth();

  if (!logoutUser) {
    throw new Error(
      "AuthContext is undefined. Please ensure you are using UserProvider."
    );
  }

  const handleLogout = () => {
    try {
      logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarItems = [
    {
      items: [
        {
          href: "/dashboard-home",
          icon: "fas fa-tachometer-alt",
          text: "Dashboard",
        },
        {
          href: "/dashboard-my-properties",
          icon: "fas fa-home",
          text: "My Properties",
        },
        {
          href: "/dashboard-my-auctions",
          icon: "fas fa-gavel",
          text: "Auctions",
        },
        {
          href: "/dashboard-my-bids",
          icon: "fas fa-hand-holding-usd",
          text: "Bids",
        },
        {
          href: "/dashboard-notifications",
          icon: "fas fa-bell",
          text: "Notifications",
        },
        {
          href: "/dashboard-my-profile",
          icon: "fas fa-user",
          text: "My Profile",
        },
        {
          href: "#",
          icon: "fas fa-sign-out-alt",
          text: "Logout",
          isLogout: true,
        },
      ],
    },
    {
      items: [],
    },
  ];

  const iconStyles = {
    "fas fa-tachometer-alt": "color: #2563eb;", // Blue for Dashboard
    "fas fa-home": "color: #16a34a;", // Green for My Properties
    "fas fa-gavel": "color: #7c3aed;", // Purple for Auctions
    "fas fa-hand-holding-usd": "color: #14b8a6;", // Teal for Bids
    "fas fa-bell": "color: #f59e0b;", // Orange for Notifications
    "fas fa-user": "color: #db2777;", // Pink for My Profile
    "fas fa-sign-out-alt": "color: #dc2626;", // Red for Logout
  };

  return (
    <div
      className="dashboard__sidebar d-none d-lg-block"
      style={{
        background: "#ffffff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        minWidth: "240px",
      }}
    >
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: "24px" }}>
            {section.title && (
              <p
                className={`fz15 fw400 ff-heading ${
                  sectionIndex === 0 ? "" : "mt30"
                }`}
                style={{
                  color: "#374151",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  fontSize: "14px",
                }}
              >
                {section.title}
              </p>
            )}
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="sidebar_list_item"
                style={{ marginBottom: "8px" }}
              >
                {item.isLogout ? (
                  <button
                    onClick={handleLogout}
                    className={`items-center w-full text-left ${
                      pathname === item.href ? "-is-active" : ""
                    }`}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      color: pathname === item.href ? "#1e3a8a" : "#4b5563",
                      background:
                        pathname === item.href ? "#e0f2fe" : "transparent",
                      transition: "background 0.2s, color 0.2s",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f3f4f6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        pathname === item.href ? "#e0f2fe" : "transparent")
                    }
                  >
                    <i
                      className={`${item.icon} mr15`}
                      style={{
                        color: iconStyles[item.icon] || "#6b7280",
                        fontSize: "18px",
                      }}
                    />
                    {item.text}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`items-center ${
                      pathname === item.href ? "-is-active" : ""
                    }`}
                    style={{
                      display: "flex",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      color: pathname === item.href ? "#1e3a8a" : "#4b5563",
                      background:
                        pathname === item.href ? "#e0f2fe" : "transparent",
                      transition: "background 0.2s, color 0.2s",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f3f4f6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        pathname === item.href ? "#e0f2fe" : "transparent")
                    }
                  >
                    <i
                      className={`${item.icon} mr15`}
                      style={{
                        color: iconStyles[item.icon] || "#6b7280",
                        fontSize: "18px",
                      }}
                    />
                    {item.text}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarDashboard;
