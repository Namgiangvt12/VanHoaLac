import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    text: "Bánh da dợp ở đây ngon tuyệt vời, bột mềm, nhân đầy đặn cắt ra không bị bở. Cả nhà mình ai cũng khen.",
    rating: 5,
    date: "1 tháng trước"
  },
  {
    id: 2,
    name: "Tran Thi B",
    text: "Vị gà quay đúng chuẩn thủ công truyền thống Vũng Tàu. Hộp quà đem biếu khách hàng rất sang trọng. Sẽ luôn ủng hộ lò Văn Hòa Lạc.",
    rating: 5,
    date: "2 tháng trước"
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    text: "Tôi đặt số lượng lớn cho công ty, giao hàng nhanh, bánh bảo quản cẩn thận, không móp méo. Rất chuyên nghiệp!",
    rating: 5,
    date: "3 tuần trước"
  }
]

export function ReviewSection() {
  return (
    <section className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Đánh Giá
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-foreground">
            Khách hàng nói gì về Văn Hòa Lạc?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dưới đây là một số đánh giá chân thực từ khách hàng qua Google Maps. Chúng tôi luôn trân trọng mọi góp ý để ngày càng hoàn thiện.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-background p-8 rounded-2xl shadow-sm border border-border transition-transform hover:-translate-y-2">
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{review.name}</h4>
                  <span className="text-xs text-muted-foreground">{review.date} qua Google Maps</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
