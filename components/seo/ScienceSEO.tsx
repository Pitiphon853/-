import React from 'react';
import { Lang } from '../dictionary';
import { FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';

export function ScienceSEO({ lang }: { lang: Lang }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16 text-left max-w-4xl mx-auto px-6 py-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-800/30"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-500/30">
          <FlaskConical className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
          {lang === "TH" ? "เครื่องมือคำนวณคณิตศาสตร์และวิทยาศาสตร์ (Math & Science)" : "Math & Science Calculators"}
        </h2>
      </div>
      
      <div className="prose prose-indigo dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
          {lang === "TH" 
            ? "คณิตศาสตร์และวิทยาศาสตร์เป็นรากฐานของเทคโนโลยีและนวัตกรรมทุกอย่างบนโลกใบนี้ ศูนย์รวมเครื่องมือคำนวณของเราออกแบบมาเพื่อช่วยให้นักเรียน นักศึกษา และนักวิจัย สามารถแก้สมการทางคณิตศาสตร์ที่ซับซ้อน หรือคำนวณค่าทางเคมีและฟิสิกส์ได้อย่างรวดเร็วและแม่นยำ พร้อมสูตรและคำอธิบายทีละขั้นตอน"
            : "Mathematics and science form the foundation of all modern technology and innovation. Our calculator hub is designed to help students and researchers quickly and accurately solve complex mathematical equations and chemical formulas, complete with step-by-step explanations."
          }
        </p>

        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">
          {lang === "TH" ? "สมการกำลังสอง (Quadratic Equation) คืออะไร?" : "What is a Quadratic Equation?"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {lang === "TH"
            ? "สมการกำลังสองคือสมการพหุนามที่มีตัวแปรยกกำลังสูงสุดคือ 2 อยู่ในรูปแบบมาตรฐาน ax² + bx + c = 0 เครื่องมือของเราจะช่วยคำนวณหาค่า x โดยใช้สูตร Quadratic Formula เพื่อหาคำตอบของสมการ ซึ่งนำไปประยุกต์ใช้ในฟิสิกส์ (เช่น การเคลื่อนที่แบบโพรเจกไทล์) และวิศวกรรม"
            : "A quadratic equation is a second-degree polynomial equation in a single variable x with the form ax² + bx + c = 0. Our tool uses the quadratic formula to quickly find the roots, which are widely applied in physics (e.g., projectile motion) and engineering."
          }
        </p>
      </div>
    </motion.div>
  );
}
