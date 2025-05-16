import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { usePathname } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";

const TestHeader = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  return (
    <>
      <div
        className="_root_4yvmq_1 false px-5"
        style={
          theme === "dark"
            ? {
                background: "url('/mons/bodyBgDark.svg')",
              }
            : { background: "url('/mons/bodyBgLight.svg')", position: "fixed" }
        }>
        <div className="_row_4yvmq_27">
          <div className="d-flex align-items-center justify-between w-100">
            <div className="_left_4yvmq_33">
              <h2 className="_left__title_4yvmq_48">
                {pathname === "/chat"
                  ? "NFT Pack Agent"
                  : pathname === "/custom-agent"
                  ? "Custom Agent"
                  : "Analyse Agent"}
              </h2>
            </div>
            <div className="d-flex gap-5 align-items-center">
              <a
                style={{ textDecoration: "none" }}
                href={"/"}
                className={` fs-6 ${`scrolled-text text-white`}`}>
                Home
              </a>
              <a
                style={{ textDecoration: "none" }}
                href={"/agent"}
                className={` fs-6 ${`scrolled-text text-white`}`}>
                Agentic AI
              </a>
            </div>
            <div className="_right_4yvmq_85">
              <div className="_root_g1d37_19"></div>
              <div className="_root_uupqj_19">
                <div className="_root_tmyk2_19">
                  <div className="_outside_tmyk2_24">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANPSURBVHgBtVZtSFNRGH7uXC1r5S2kb+RWEEVfRmSZfdiPoKTUfhRRETP6tKKlRVDGtvzRB8r2o1Iq0koKLEj9oVGEsyw/ljiM1B+VFyWbmXmnU7e57XTuLW1zujTxgQPnvvd9n+c95z7ncIFAYFWstbNHY7mbW1zOLm+gg/wZ7ZasJ8Xt1m71VpWeC0QhHzTKHeMYhsmaqgyOZghB0KQJftJBExTRMhmiTVVNetn8xGyPx6MDn8kPTJT5BeYnnqbk1XQajWGCEKKSarjj6oAClFxDkw1ihxg5WIaBuBrNoALXM1+clgcxWowSE4PHaS+nF6h9BGjX3LmjW7RfXqci6cBmTJ6owEgRogyGet8mfHp2Fgd+1GvK2EVcv0DHG5O4LHbOzKlI0+7Ch6IUHN+7ngqN/ycx4yE4f3gLqnNOIEnRisYNO2G59ZANiYrMkhLK2LVc+ZRlpDb2EOmoNBNvNFsE4nZ7SOvjAuJlUWmIMbvdSSyfmwl/MY2Y5kaSCnYF+RiTQKzGd30UrDyi7W08dcCg3c2aERKwe4ViHGbMmwmSmoQwOqQV+XKp5d8zHsTRzIBEXaYav5jwqhQumy1gndvWvYkRTyX+z5bDAS8bQ3IRnAxjDFGAxxiBfm5BPldzipcrJ3GBEjsrzGh7+twnFro7BsrVywOVwWN3mOVz1IdK4HWxUe96dyD6DkFKpZ9AyOZ1CN2zw4/Uu564XPniFomXGzpKylG7/SBM08JRFRaFppR0tDRY4HC4MGSHHg8sLVafWNf7GtTHH4WJDUfl9Ig8GT0YQt2OBGNd3BHJ77OTDyO0MAcZygVYFpsGp7N3SAFbtwNrYq8i8eIjNDa1STHl6hVYnH8biwvvZUcKZsmmsJaaE2Yl7hfCSvOgd07Hyn03cO3OS7iH4bGuHicyH5di6bZUJGtz8fWbeKwgTI5apRMnEoWo9DB0iW7hznToc4yw2uwYKWzdTugfGDFv4yVcuVmkozvD9wuISEnebujosuswSvS63LoLJ2MMfc++m8BnaqkJztCZgJFDkGoph3fQf5f5DAO12ko67mOYoMRGsUasHfhu8L+K338HqgiVXut2I95td8TR53D8vbd40mOnOaSkremnAUL2kCv+BW/kdNOgb9zJAAAAAElFTkSuQmCC"
                      alt="en"
                    />
                    <p>EN</p>
                    <img
                      src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%3e%3cg%20clip-path='url(%23clip0_2095_32833)'%3e%3cpath%20d='M8%209.6004L4.8%206.4004'%20stroke='%23B8B8B8'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.0002%209.6004L11.2002%206.4004'%20stroke='%23B8B8B8'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2095_32833'%3e%3crect%20width='16'%20height='16'%20fill='white'%20transform='translate(16)%20rotate(90)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                      alt="arrow"
                      className="_arrowDown_tmyk2_86"
                    />
                  </div>
                </div>
                <div className="_wallet_uupqj_28 _button__hide_uupqj_52">
                  <WalletMultiButton />
                </div>
                <a
                  className="_button_uupqj_46 _button__hide_uupqj_52"
                  aria-label="Settings"
                  href="/en/main/settings">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B8B8B8">
                    <path
                      d="M10.1389 3.46333C10.6122 1.51222 13.3878 1.51222 13.8611 3.46333C13.9321 3.75644 14.0714 4.02864 14.2675 4.25778C14.4636 4.48691 14.711 4.6665 14.9896 4.78194C15.2682 4.89738 15.5702 4.94539 15.8709 4.92208C16.1716 4.89876 16.4625 4.80478 16.72 4.64778C18.4344 3.60333 20.3978 5.56556 19.3533 7.28111C19.1966 7.53851 19.1027 7.82926 19.0795 8.12975C19.0562 8.43023 19.1042 8.73197 19.2195 9.01042C19.3348 9.28888 19.5142 9.5362 19.743 9.73228C19.9719 9.92836 20.2438 10.0677 20.5367 10.1389C22.4878 10.6122 22.4878 13.3878 20.5367 13.8611C20.2436 13.9321 19.9714 14.0714 19.7422 14.2675C19.5131 14.4636 19.3335 14.711 19.2181 14.9896C19.1026 15.2682 19.0546 15.5702 19.0779 15.8709C19.1012 16.1716 19.1952 16.4625 19.3522 16.72C20.3967 18.4344 18.4344 20.3978 16.7189 19.3533C16.4615 19.1966 16.1707 19.1027 15.8703 19.0795C15.5698 19.0562 15.268 19.1042 14.9896 19.2195C14.7111 19.3348 14.4638 19.5142 14.2677 19.743C14.0716 19.9719 13.9323 20.2438 13.8611 20.5367C13.3878 22.4878 10.6122 22.4878 10.1389 20.5367C10.0679 20.2436 9.92864 19.9714 9.73254 19.7422C9.53644 19.5131 9.28901 19.3335 9.01039 19.2181C8.73176 19.1026 8.42982 19.0546 8.12913 19.0779C7.82844 19.1012 7.5375 19.1952 7.28 19.3522C5.56556 20.3967 3.60222 18.4344 4.64667 16.7189C4.80345 16.4615 4.89728 16.1707 4.92054 15.8703C4.9438 15.5698 4.89583 15.268 4.78052 14.9896C4.66522 14.7111 4.48584 14.4638 4.25697 14.2677C4.02809 14.0716 3.75618 13.9323 3.46333 13.8611C1.51222 13.3878 1.51222 10.6122 3.46333 10.1389C3.75644 10.0679 4.02864 9.92864 4.25778 9.73254C4.48691 9.53644 4.6665 9.28901 4.78194 9.01039C4.89738 8.73176 4.94539 8.42982 4.92208 8.12913C4.89876 7.82844 4.80478 7.5375 4.64778 7.28C3.60333 5.56556 5.56556 3.60222 7.28111 4.64667C8.39222 5.32222 9.83222 4.72444 10.1389 3.46333Z"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                    <path
                      d="M8.6665 12C8.6665 12.884 9.01769 13.7319 9.64281 14.357C10.2679 14.9821 11.1158 15.3333 11.9998 15.3333C12.8839 15.3333 13.7317 14.9821 14.3569 14.357C14.982 13.7319 15.3332 12.884 15.3332 12C15.3332 11.1159 14.982 10.2681 14.3569 9.64297C13.7317 9.01785 12.8839 8.66666 11.9998 8.66666C11.1158 8.66666 10.2679 9.01785 9.64281 9.64297C9.01769 10.2681 8.6665 11.1159 8.6665 12Z"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  </svg>
                </a>
                <button
                  title="Log out"
                  aria-label="Log out"
                  className="_button_uupqj_46">
                  <svg
                    stroke="#B8B8B8"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none">
                    <path
                      d="M17.5 14.5L20 12L17.5 9.5"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                    <path
                      d="M12 12H20"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                    <path
                      d="M12 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H12"
                      stroke-width="1.5"
                      stroke-linecap="round"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="_mob_4yvmq_154">
        <div className="_mob__left_4yvmq_178">
          <button className="_mob__burger_4yvmq_184">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 6H20"
                stroke="#FAFAFA"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path
                d="M4 12H20"
                stroke="#FAFAFA"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path
                d="M4 18H20"
                stroke="#FAFAFA"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
          </button>
          <a href="/en/main/playground">
            <img
              className="_mob__logo_4yvmq_188"
              src="/assets/Logo-DsYHHI32.webp"
              alt="logo"
            />
          </a>
        </div>
        <div>
          <div className="_root_g1d37_19 _mob__season_4yvmq_191"></div>
        </div>
      </header>
    </>
  );
};

export default TestHeader;
