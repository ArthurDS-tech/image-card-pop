import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isSpeaking?: boolean;
}

const participants: Participant[] = [
  { id: "1", name: "Oğuz", avatar: "https://i.pravatar.cc/100?img=11", isSpeaking: true },
  { id: "2", name: "Ashish", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "3", name: "Mariana", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: "4", name: "MDS", avatar: "https://i.pravatar.cc/100?img=33" },
  { id: "5", name: "Ana", avatar: "https://i.pravatar.cc/100?img=9" },
  { id: "6", name: "Natko", avatar: "https://i.pravatar.cc/100?img=15", isSpeaking: true },
  { id: "7", name: "Afshin", avatar: "https://i.pravatar.cc/100?img=68" },
];

const VoiceChatTag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const displayedAvatars = participants.slice(0, 4);
  const remainingCount = participants.length - 4;

  return (
    <div className="relative">
      {/* Tag Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="voice-tag flex items-center gap-1 rounded-full bg-voice-tag px-2 py-2 shadow-voice-tag transition-all hover:shadow-voice-tag-hover"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Audio Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
            <rect x="4" y="8" width="2" height="8" rx="1" fill="currentColor" />
            <rect x="8" y="5" width="2" height="14" rx="1" fill="currentColor" />
            <rect x="12" y="8" width="2" height="8" rx="1" fill="currentColor" />
            <rect x="16" y="3" width="2" height="18" rx="1" fill="currentColor" />
            <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor" />
          </svg>
        </div>

        {/* Stacked Avatars */}
        <div className="flex -space-x-2.5 pl-1">
          {displayedAvatars.map((participant, index) => (
            <motion.div
              key={participant.id}
              className={`relative h-10 w-10 rounded-full border-2 border-voice-tag bg-muted overflow-hidden ${
                participant.isSpeaking ? "ring-2 ring-voice-active ring-offset-1" : ""
              }`}
              style={{ zIndex: displayedAvatars.length - index }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <img
                src={participant.avatar}
                alt={participant.name}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Remaining Count */}
        {remainingCount > 0 && (
          <div className="flex h-10 items-center pl-1 pr-2 text-sm font-medium text-muted-foreground">
            +{remainingCount}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-0.5">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </motion.button>

      {/* Backdrop & Card */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-6 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-8" />
                <h2 className="text-lg font-semibold text-foreground">Voice Chat</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Participants Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {participants.map((participant, index) => (
                  <motion.div
                    key={participant.id}
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <div className="relative">
                      <div
                        className={`h-14 w-14 rounded-full overflow-hidden border-2 ${
                          participant.isSpeaking
                            ? "border-voice-active shadow-[0_0_0_2px_hsl(var(--voice-active)/0.3)]"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {participant.isSpeaking && (
                        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card shadow-sm">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <rect x="6" y="8" width="2" height="8" rx="1" fill="hsl(var(--foreground))" />
                            <rect x="11" y="5" width="2" height="14" rx="1" fill="hsl(var(--foreground))" />
                            <rect x="16" y="8" width="2" height="8" rx="1" fill="hsl(var(--foreground))" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-foreground truncate max-w-full">
                      {participant.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Join Button */}
              <motion.button
                className="w-full rounded-xl bg-join-button py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-join-button-hover"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIsOpen(false)}
              >
                Join Now
              </motion.button>

              {/* Muted Notice */}
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Mic will be muted initially.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceChatTag;
