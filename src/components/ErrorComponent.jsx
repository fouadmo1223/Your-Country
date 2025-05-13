import { motion } from 'framer-motion';


const ErrorComponent = ({error}) => {
  return (
    <div>
      <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          </motion.div>
    </div>
  )
}

export default ErrorComponent
