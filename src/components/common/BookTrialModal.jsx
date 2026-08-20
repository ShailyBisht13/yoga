import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useAppContext } from '@/context/AppContext';
import BookTrialForm from '@/components/BookTrialForm';

export default function BookTrialModal() {
  const { isTrialModalOpen, closeTrialModal } = useAppContext();

  return (
    <AnimatePresence>
      {isTrialModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeTrialModal}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-lg rounded-[28px] border border-border bg-[#FBF9F5] p-6 sm:p-8 shadow-2xl z-10 my-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeTrialModal}
              aria-label="Close trial modal"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-dark/70 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <IoClose className="text-xl" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-6">
              <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Free Experience
              </span>
              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="mt-2 text-2xl sm:text-3xl font-semibold text-dark leading-tight"
              >
                Book Your Trial Class
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-muted">
                Fill in your details below and we&rsquo;ll confirm your batch slot within an hour.
              </p>
            </div>

            {/* Form */}
            <BookTrialForm />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
