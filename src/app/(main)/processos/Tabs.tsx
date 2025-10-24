'use client';

type SubcategoryType = {
  name: string;
};


type MenuItemType = {
  name: string;
  subcategories: SubcategoryType[];
};


interface TabsProps {
  menuItems: MenuItemType[];
  activeTab: string;
  activeSubTab: string | null;
  onMainTabClick: (tabName: string) => void;
  onSubTabClick: (mainTabName: string, subTabName: string) => void;
}


export default function Tabs({
  menuItems,
  activeTab,
  activeSubTab,
  onMainTabClick,
  onSubTabClick
}: TabsProps) {


  return (
    <div className="mb-6">
      <nav>
        <ul className="relative flex ">
          {menuItems.map((item) => {
            const isActive = item.name === activeTab;
            return (
              <li key={item.name} className="relative group">
                <button
                  type="button"
                  onClick={() => onMainTabClick(item.name)}
                  className={`
                      block py-2 px-1 font-medium cursor-pointer
                      w-fit min-w-[100px] sm:min-w-[120px] lg:min-w-[130px] text-center
                      ${isActive
                      ? 'border-b-4 border-blue-500 text-blue-600'
                      : 'border-b-4 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                      transition-colors duration-300
                      ${!isActive && 'group-hover:text-blue-600'}
                    `}
                >
                  <p>{item.name}</p>
                </button>


                {item.subcategories.length > 0 && (
                  <div className="
                      absolute mt-1 w-full
                      bg-white rounded-md shadow-lg border border-gray-200
                      min-w-max invisible opacity-0 scale-40 group-hover:visible group-hover:opacity-100 group-hover:scale-100
                      transition-all duration-200 ease-in-out
                      z-10
                    ">
                    <ul className="py-0.5">
                      {item.subcategories.map((subItem) => {
                        const isSubActive = subItem.name === activeSubTab;
                        return (
                          <li key={subItem.name}>
                            <button
                              type="button"
                              onClick={() => onSubTabClick(item.name, subItem.name)}
                              className={`
                                  w-full text-left block px-4 py-2 text-sm  cursor-pointer
                                  ${isSubActive
                                  ? 'font-semibold text-blue-600 bg-blue-50'
                                  : 'text-gray-700 hover:bg-gray-100'
                                }
                                `}
                            >
                              {subItem.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

