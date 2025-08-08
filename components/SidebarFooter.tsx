import Image from "next/image";

interface SidebarFooterProps {
  user: User;
  type?: "desktop" | "mobile";
}

const SidebarFooter = ({ user, type = "desktop" }: SidebarFooterProps) => {
  const { firstName, lastName } = user;

  const handleLogout = () => {};

  return (
    <footer className="footer">
      <div
        className={type === "desktop" ? "footer-name" : "footer-name_mobile"}
      >
        <p className="text-xl font-bold text-gray-700">{firstName[0]}</p>
      </div>

      <div
        className={type === "desktop" ? "footer-email" : "footer-email_mobile"}
      >
        <h1 className="text-gray-900 text-sm font-semibold">
          {`${firstName} ${lastName}`}
        </h1>
        <p className="text-xs font-normal text-gray-500">{user?.email}</p>
      </div>

      <div className="footer-image" onClick={handleLogout}>
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  );
};

export default SidebarFooter;
