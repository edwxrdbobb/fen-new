import { User, MapPin, Calendar, Star, Heart, Edit2 } from 'lucide-react';

export function ProfileView({ user }: { user: any }) {
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Profile Header Card - Glassmorphism */}
                <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 shadow-xl">
                    <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
                    <div className="px-6 pb-6">
                        <div className="relative flex justify-between items-end -mt-12 mb-4">
                            <div className="flex items-end">
                                <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 p-1 shadow-lg">
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-4xl text-white font-bold">
                                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                </div>
                                <div className="ml-4 mb-1">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || 'Explorer'}</h1>
                                    <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-white/50 dark:bg-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-700/80 backdrop-blur-md rounded-xl text-sm font-medium transition-colors flex items-center border border-gray-200 dark:border-gray-600">
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 backdrop-blur-sm">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-lg text-emerald-600 dark:text-emerald-300">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Places Visited</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">12</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 backdrop-blur-sm">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg text-purple-600 dark:text-purple-300">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Reviews Written</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">5</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 backdrop-blur-sm">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-rose-100 dark:bg-rose-800 rounded-lg text-rose-600 dark:text-rose-300">
                                        <Heart className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Favorites</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">8</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 shadow-xl p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-emerald-500" />
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center p-3 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                                        {/* Placeholder image */}
                                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Visited Cotton Tree</p>
                                        <p className="text-xs text-gray-500">2 days ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 shadow-xl p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Heart className="w-5 h-5 mr-2 text-rose-500" />
                            Recent Favorites
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center p-3 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-colors cursor-pointer">
                                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                                        <div className="w-full h-full bg-gradient-to-br from-emerald-200 to-teal-300"></div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Lumley Beach</p>
                                        <p className="text-xs text-gray-500">Added to favorites</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
