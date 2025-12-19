import { Moon, Sun, Bell, Lock, Globe, User, Shield } from 'lucide-react';
import { useTheme } from "../../contexts/ThemeContext";

export function SettingsView() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

                <div className="space-y-6">
                    {/* Appearance Section */}
                    <div className="rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <Sun className="w-5 h-5 mr-2 text-emerald-500" />
                                Appearance
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${theme === 'dark' ? 'bg-emerald-600' : 'bg-gray-300'}`}
                                >
                                    <span className={`${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'} inline-block h-6 w-6 transform rounded-full bg-white transition-transform`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <Bell className="w-5 h-5 mr-2 text-purple-500" />
                                Notifications
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts about new events</p>
                                </div>
                                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-emerald-600 transition-colors">
                                    <span className="translate-x-7 inline-block h-6 w-6 transform rounded-full bg-white transition-transform" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Email Updates</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly newsletters</p>
                                </div>
                                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300 transition-colors">
                                    <span className="translate-x-1 inline-block h-6 w-6 transform rounded-full bg-white transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Privacy & Security */}
                    <div className="rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <Shield className="w-5 h-5 mr-2 text-rose-500" />
                                Privacy & Security
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
                                <span className="font-medium text-gray-700 dark:text-gray-200">Change Password</span>
                                <Lock className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left text-rose-600">
                                <span className="font-medium">Delete Account</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
