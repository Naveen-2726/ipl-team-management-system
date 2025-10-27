import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'

const EvaluationDetail = () => {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/evaluations" className="btn-secondary flex items-center gap-2 mb-4 w-fit">
            <ArrowLeft className="h-4 w-4" />
            Back to Evaluations
          </Link>
          <h1 className="text-4xl font-bold font-display text-gradient mb-2">Evaluation Details</h1>
        </motion.div>

        <div className="card p-8 text-center">
          <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Evaluation ID: {id}</h3>
          <p className="text-slate-600">Evaluation details will be loaded from the backend.</p>
        </div>
      </div>
    </div>
  )
}

export default EvaluationDetail