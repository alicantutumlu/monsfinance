import React from "react";

const Sidebar = ({ name, points, credits }: any) => {
  const navLinks = [
    {
      href: "/en/main/playground",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          stroke="#B8B8B8"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8.33344 14.1998V11.2665C8.33342 11.0739 8.37135 10.8832 8.44506 10.7053C8.51878 10.5273 8.62682 10.3657 8.76303 10.2295C8.89916 10.0933 9.06083 9.98517 9.23878 9.91143C9.41673 9.83769 9.60747 9.79976 9.80009 9.7998C9.99271 9.79975 10.1835 9.83768 10.3614 9.91142C10.5393 9.98516 10.701 10.0933 10.8371 10.2295C10.9734 10.3657 11.0814 10.5273 11.1551 10.7053C11.2288 10.8832 11.2668 11.0739 11.2667 11.2665V14.1998M8.33344 12.7332H11.2667M13.4667 9.7998H15.6667M13.4667 14.1998H15.6667M14.5667 9.7998V14.1998"
            stroke-width="1.25"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M6.13335 20.0668H5.4C3.78104 20.0668 2.46665 18.7522 2.46665 17.1334C2.46665 15.9194 3.45245 14.9334 4.66665 14.9334H3.93335C2.31439 14.9335 1 13.6189 1 12.0001C1 10.3813 2.31439 9.06677 3.93335 9.06677H4.6667C3.4525 9.06677 2.4667 8.08078 2.4667 6.86677C2.4667 5.24794 3.78108 3.93342 5.40005 3.93342H6.13339M6.13335 20.0668C6.13335 19.2572 6.79048 18.6 7.59996 18.6M6.13335 20.0668C6.13335 21.6856 7.4477 23 9.06666 23C10.6856 23 12 21.6855 12 20.0666M6.13339 3.93342C6.13339 4.74299 6.79048 5.4 7.59996 5.4M6.13339 3.93342C6.13339 2.31459 7.4477 1 9.06661 1C10.6855 1 12 2.31452 12 3.93335M17.8667 20.0668H18.6C20.219 20.0668 21.5333 18.7522 21.5333 17.1334C21.5333 15.9194 20.5475 14.9334 19.3333 14.9334H20.0667C21.6857 14.9334 23 13.6189 23 12.0001C23 10.3812 21.6857 9.06672 20.0667 9.06672H19.3333C20.5475 9.06672 21.5333 8.08074 21.5333 6.86672C21.5333 5.24789 20.219 3.93337 18.6 3.93337H17.8667M17.8667 20.0668C17.8667 21.6856 16.5523 23 14.9333 23C13.3143 23 12 21.6855 12 20.0666M17.8667 20.0668C17.8667 19.2571 17.2095 18.6 16.4 18.6M17.8667 3.93337C17.8667 2.31455 16.5523 1 14.9333 1C13.3143 1 12 2.31452 12 3.93335M17.8667 3.93337C17.8667 4.74299 17.2095 5.4 16.4 5.4M12 3.93335V6.86665M12 20.0666V17.1333"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      text: "Agent Playground",
      active: true,
    },
    {
      href: "/en/main/news",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          stroke="#B8B8B8"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13.4272 6.5456C11.2988 5.56125 9.94312 3.49319 10.1269 1.1554M16.5022 22.0327C15.4936 21.43 14.6416 20.3329 14.2082 18.8788C14.0645 18.3964 14.06 17.9847 14.0489 17.4819M2.44897 6.54439C4.31173 3.1154 7.81993 1 11.9966 1C16.1362 1 19.6755 3.1686 21.5527 6.54772M21.539 17.4713C19.5668 20.7545 16.1736 22.9998 11.997 22.9998C7.86167 22.9998 4.33752 20.8539 2.45864 17.4806M20.5752 6.68311H3.42501C2.08578 6.68311 1.00012 7.76876 1.00012 9.10799V14.8916C1.00012 16.2308 2.08578 17.3164 3.42501 17.3164H20.5752C21.9145 17.3164 23.0001 16.2308 23.0001 14.8916V9.10799C23.0001 7.76877 21.9145 6.68311 20.5752 6.68311Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M4.06348 13.7129V10.253L6.6382 13.7129V10.253"
            stroke-width="1.25"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M12.6301 10.2739V13.748L14.147 11.7306L15.6105 13.748V10.2739"
            stroke-width="1.25"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M10.3992 10.2582H8.86871V13.7129H10.3992"
            stroke-width="1.25"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M10.3992 12.0293H8.86871"
            stroke-width="1.25"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M19.6003 10.2665H18.6576C18.207 10.2665 17.8416 10.6319 17.8416 11.0825C17.8416 11.5332 18.207 11.8985 18.6576 11.8985H19.1418C19.6525 11.8985 20.0666 12.3125 20.0666 12.8233C20.0666 13.3341 19.6525 13.748 19.1418 13.748H17.8541"
            stroke-width="1.25"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
      text: "News Feed",
    },
    // Diğer linkler (Reward Center ve Settings) de aynı şekilde eklenebilir
  ];

  return (
    <aside className="_root_5pgf9_1">
      <a className="_logo_5pgf9_19" href="/en/main/playground">
        <img src="/mons/logo-mons.svg" alt="logo" />
      </a>
      <div className="_root_z4me4_1">
        <div className="_root__avatar_z4me4_79">
          <img
            className="_root__img_z4me4_82"
            src="/agent/profile-image.webp"
            alt="avatar"
          />
          <button
            aria-label="open settings"
            type="button"
            className="_root__referal_z4me4_91"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              stroke="#B8B8B8"
            >
              <path
                d="M14.5005 18V16.4"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M8.1001 12.4L12.9002 7.59991"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M9.7002 5.19995L10.0706 4.77114C10.8209 4.02099 11.8384 3.5996 12.8993 3.59967C13.9603 3.59975 14.9778 4.02128 15.7279 4.77154C16.4781 5.5218 16.8995 6.53933 16.8994 7.60028C16.8993 8.66123 16.4778 9.6787 15.7275 10.4289L15.3003 10.8001"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M11.2999 14.7999L10.9823 15.2272C10.2232 15.9777 9.19886 16.3987 8.13141 16.3987C7.06395 16.3987 6.03956 15.9777 5.28055 15.2272C4.90642 14.8572 4.60941 14.4168 4.4067 13.9312C4.20399 13.4457 4.09961 12.9248 4.09961 12.3987C4.09961 11.8726 4.20399 11.3517 4.4067 10.8661C4.60941 10.3806 4.90642 9.94016 5.28055 9.57024L5.69976 9.19983"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M16.9004 13.9999H18.5004"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M2.5 6.00006H4.10003"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6.49951 1.99969V3.59973"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <h2 className="_root__name_z4me4_32">{name}</h2>
        <div className="_root__points_z4me4_13">
          <div>
            <p>{points} Points</p>
            <img
              data-tooltip-id="points-1"
              src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%3e%3cpath%20d='M7.99998%200.999918C11.85%200.999918%2015%204.14994%2015%207.99996C15%2011.85%2011.85%2015%207.99998%2015C4.14996%2015%200.999939%2011.85%200.999939%207.99996C0.999939%204.14994%204.14996%200.999918%207.99998%200.999918Z'%20stroke='%23B8B8B8'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8%2010.8008V7.30076'%20stroke='%23B8B8B8'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M7.99603%205.19922H8.00232'%20stroke='%23B8B8B8'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
              alt="Info"
            />
          </div>
          <img
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='4'%20height='4'%20viewBox='0%200%204%204'%20fill='none'%3e%3ccircle%20opacity='0.5'%20cx='2'%20cy='2'%20r='2'%20fill='%23676767'/%3e%3c/svg%3e"
            alt="Dot"
          />
          <div>
            <p>{credits} Credits</p>
            <img
              data-tooltip-id="points-2"
              src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%3e%3cpath%20d='M7.99998%200.999918C11.85%200.999918%2015%204.14994%2015%207.99996C15%2011.85%2011.85%2015%207.99998%2015C4.14996%2015%200.999939%2011.85%200.999939%207.99996C0.999939%204.14994%204.14996%200.999918%207.99998%200.999918Z'%20stroke='%23B8B8B8'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8%2010.8008V7.30076'%20stroke='%23B8B8B8'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M7.99603%205.19922H8.00232'%20stroke='%23B8B8B8'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
              alt="Info"
            />
          </div>
        </div>
      </div>
      <div className="_root_10duu_1">
        <nav className="_navlinks_10duu_21">
          {navLinks.map((link, index) => (
            <a
              key={index}
              className={`_link_10duu_35 ${link.active ? "active" : ""}`}
              href={link.href}
            >
              {link.icon}
              <span>{link.text}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};
export default Sidebar;
