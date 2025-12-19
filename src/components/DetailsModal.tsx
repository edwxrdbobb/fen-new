import { Dialog } from '@headlessui/react';
import { X, MapPin, Calendar, Clock, DollarSign, Star, Users, Globe, Phone, Share2, Heart } from 'lucide-react';

interface DetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: any; // Type would be Location | Event ideally
    type: "location" | "event";
}

export function DetailsModal({ isOpen, onClose, item, type }: DetailsModalProps) {
    if (!item) return null;

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

            {/* Full-screen scrollable container */}
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">

                        {/* Image Header */}
                        <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                            {item.imageUrl ? (
                                <img
                                    src={item.imageUrl}
                                    alt={item.name || item.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl">{type === 'location' ? '📍' : '🎉'}</span>
                                </div>
                            )}

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                                    {item.category}
                                </span>
                                {item.isVerified && (
                                    <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-md rounded-full text-xs font-semibold text-white uppercase tracking-wide">
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <Dialog.Title className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {item.name || item.title}
                                    </Dialog.Title>

                                    {/* Location/Address */}
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <MapPin className="w-4 h-4 mr-1.5" />
                                        <span className="text-sm">
                                            {type === 'location' ? item.address : item.location?.name || 'Freetown'}
                                        </span>
                                    </div>
                                </div>

                                {/* Rating (Location only) */}
                                {type === 'location' && (
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1.5" />
                                            <span className="font-bold text-gray-900 dark:text-white">{item.rating?.toFixed(1) || "New"}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 mt-1">{item.reviewCount || 0} reviews</span>
                                    </div>
                                )}
                            </div>

                            {/* Event Specific Details */}
                            {type === 'event' && (
                                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Date</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{formatDate(item.startDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 text-emerald-600 mr-3" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Time</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{formatTime(item.startDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <DollarSign className="w-5 h-5 text-emerald-600 mr-3" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Price</p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {item.ticketPrice ? `${item.ticketPrice.currency}${item.ticketPrice.min}` : 'Free'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 text-emerald-600 mr-3" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Attendees</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{item.attendeeCount || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            <div className="prose dark:prose-invert max-w-none mb-8">
                                <h3 className="text-lg font-semibold mb-2">About</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Location additional info */}
                            {type === 'location' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    {item.contact?.phone && (
                                        <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="text-gray-600 dark:text-gray-300">{item.contact.phone}</span>
                                        </div>
                                    )}
                                    {item.contact?.website && (
                                        <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <Globe className="w-5 h-5 text-gray-400 mr-3" />
                                            <a href={item.contact.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline truncate">
                                                Visit Website
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={() => {
                                        if (type === 'location') {
                                            const { lat, lng } = item.coordinates;
                                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                                        } else {
                                            // TODO: Implement ticket purchase flow
                                            console.log("Get Tickets clicked");
                                        }
                                    }}
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
                                >
                                    {type === 'event' ? 'Get Tickets' : 'Get Directions'}
                                </button>
                                <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}
