import React, { useState } from 'react';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';

const Sidebar = ({
  bgColor = 'bg-gray-800',
  textColor = 'text-white',
  position = 'fixed',
  side = 'left',
  top = 'top-16',
  width = 'w-64',
  height = 'h-full',
  padding = 'p-4',
  buttonBgColor = 'bg-gray-700',
  buttonHoverBgColor = 'hover:bg-gray-600',
  dropdownPadding = 'p-2',
  dropdownBgColor = 'bg-gray-700',
  dropdownMarginTop = 'mt-2',
  sections = [],
  showSettingsButton = true,
  settingsButton = { label: 'Settings', icon: <SettingsTwoToneIcon className="mr-2" /> }
}) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (index) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className={`${width} ${bgColor} ${textColor} ${height} ${position} ${side}-0 ${top} ${padding} flex flex-col`}>
      <div className="flex-grow">
        {sections.map((section, index) => (
          <div key={index} className="mt-4">
            <button
              className={`w-full text-left ${buttonBgColor} ${dropdownPadding} rounded flex items-center`}
              onClick={() => section.dropdown && toggleDropdown(index)}
            >
              {section.icon}
              {section.label}
            </button>
            {section.dropdown && openDropdowns[index] && (
              <div className={`${dropdownMarginTop} ${dropdownBgColor} rounded ${dropdownPadding}`}>
                {section.dropdown.map((item, idx) => (
                  <button key={idx} className={`w-full text-left ${dropdownPadding} rounded ${buttonHoverBgColor}`}>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {showSettingsButton && (
        <div className="mt-4">
          <button className={`w-full text-left ${dropdownPadding} rounded ${buttonHoverBgColor} flex items-center`}>
            {settingsButton.icon}
            {settingsButton.label}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;






