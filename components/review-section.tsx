"use client"

import { Star, Sparkles, MessageSquareQuote } from "lucide-react"
import { motion } from "framer-motion"

const reviews = [
  {
    id: 1,
    name: "Quyên Bùi",
    text: "Bánh nó ngon lắm mn ơi, chủ nhiệt tình dễ thương nữa",
    rating: 5,
    date: "1 năm trước"
  },
  {
    id: 2,
    name: "Trâm Trần",
    text: "Bánh ăn ngon lắm, năm nào cũng chờ tới mùa mới đc ăn. Bé chủ tiệm dễ thương lại nhiệt tình, sẽ ủng hộ shop nữa nha",
    rating: 5,
    date: "1 năm trước"
  },
  {
    id: 3,
    name: "Diễm Phạm",
    text: "Bánh ngọt vừa phải, ko hương liệu ko chất bảo quản nên cả nhà yên tâm về chất lượng. Tư vấn và giao hàng nhiệt tình",
    rating: 5,
    date: "1 năm trước"
  }
]

export function ReviewSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-labelledby="review-heading">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 space-y-3 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9DF] border border-[#E8E1D5] text-[#B58A4A] text-xs uppercase tracking-[0.25em] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#B58A4A]" />
          <span>Đánh Giá Thực Tế</span>
        </div>

        <h2 
          id="review-heading"
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#30251F] tracking-tight leading-tight"
        >
          Khách hàng nói gì về Văn Hòa Lạc (Van Hoa Lac)?
        </h2>

        <p className="text-[#766960] text-sm sm:text-base leading-relaxed">
          Dưới đây là một số đánh giá chân thực từ khách hàng qua Google Maps. Chúng tôi luôn trân trọng mọi góp ý để ngày càng hoàn thiện.
        </p>
      </motion.div>
      
      {/* 3 Review Cards with Staggered In-View Reveal & Subtle 6px Lift */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {reviews.map((review, idx) => (
          <motion.div 
            key={review.id} 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ 
              duration: 0.75, 
              delay: idx * 0.12, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            className="bg-[#FFFCF7] p-8 rounded-[26px] border border-[#E8E1D5] hover:border-[#B58A4A]/60 transition-colors duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1 text-[#B58A4A]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <MessageSquareQuote className="w-6 h-6 text-[#E8E1D5]" />
              </div>

              {/* Review Text */}
              <p className="text-[#30251F] text-sm sm:text-base leading-relaxed font-normal italic">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="flex items-center gap-3.5 pt-4 border-t border-[#E8E1D5]/60">
              <div className="w-10 h-10 bg-[#7A2935]/10 border border-[#7A2935]/20 rounded-full flex items-center justify-center text-[#7A2935] font-bold text-sm shrink-0">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#30251F]">{review.name}</h4>
                <span className="text-xs text-[#766960]">{review.date} qua Google Maps</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

