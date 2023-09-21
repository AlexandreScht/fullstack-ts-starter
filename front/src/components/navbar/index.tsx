import AuthNavigation from '@/components/navigations/auth';
import ToggleThemeSwitcher from '@/components/themes/themeSwitcher';

const DefaultNavbar = async () => {
  return (
    <nav className="w-full h-12 flex justify-between border-b-4 border-b-slate-300 mb-8 items-center">
      <div className="w-[3.75%] text-2xl ml-4">
        <ToggleThemeSwitcher />
      </div>
      <div>
        <AuthNavigation />
      </div>
    </nav>
  );
};

export default DefaultNavbar;
