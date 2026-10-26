export interface ProductItem {
  id: string
  name: string
  shortName: string
  description: string
  longDescription: string
  price: string
  priceValue: number
  image: string
  slug: string
  category: string
  weight: string
  ingredients: string[]
  shelfLife: string
  storage: string
  highlight: string
}

export const PRODUCTS: ProductItem[] = [
  {
    id: '1',
    name: "Bánh Da Dợp Thập Cẩm 2 Trứng",
    shortName: "Da dợp 2 trứng",
    description: "Bánh trung thu da dợp đặc sắc 2 trứng hòa quyện hương vị gia truyền Văn Hòa Lạc Vũng Tàu.",
    longDescription: "Bánh Da Dợp Thập Cẩm 2 Trứng là dòng bánh độc bản trứ danh của Văn Hòa Lạc Vũng Tàu. Khác với vỏ bánh nướng thông thường, lớp vỏ Da Dợp mỏng tang, nhiều tầng giòn xốp ôm trọn nhân thập cẩm xá xíu, lạp xưởng, mỡ đường thanh và 2 lòng đỏ trứng muối bùi béo tự nhiên.",
    price: "130.000đ",
    priceValue: 130000,
    image: "/images/banh-da-dop-2-trung.png",
    slug: "da-dop-2-trung",
    category: "Da Dợp Thập Cẩm",
    weight: "250g",
    ingredients: [
      "Vỏ bánh Da Dợp nhiều lớp giòn xốp",
      "Thịt heo xá xíu gia truyền",
      "Lạp xưởng Mai Quế Lộ",
      "2 lòng đỏ trứng muối",
      "Mè rang, mứt bí, hạt dưa"
    ],
    shelfLife: "20 - 30 ngày (nguyên bao bì hút chân không); 4 - 6 ngày sau khi mở gói",
    storage: "Nơi khô ráo, thoáng mát (15 - 20°C) khi nguyên bao bì; sau khi mở gói nên bọc kín để ngăn mát tủ lạnh dùng trong 4 - 6 ngày",
    highlight: "Vỏ mỏng nhiều lớp giòn xốp độc bản, ít ngấy"
  },
  {
    id: '2',
    name: "Bánh Da Dợp Thập Cẩm 3 Trứng",
    shortName: "Da dợp 3 trứng",
    description: "Bánh trung thu da dợp cao cấp 3 trứng thơm ngon đặc biệt từ Văn Hòa Lạc Vũng Tàu.",
    longDescription: "Bánh Da Dợp Thập Cẩm 3 Trứng là phiên bản thượng hạng dành cho những ai mê vị trứng muối bùi béo. Từng lớp vỏ giòn xốp phủ ngoài nhân gà quay, xá xíu kết hợp cùng 3 lòng đỏ trứng muối nguyên quả được xử lý rượu mai quế lộ thơm lừng.",
    price: "165.000đ",
    priceValue: 165000,
    image: "/images/banh-da-dop-3-trung.png",
    slug: "da-dop-3-trung",
    category: "Da Dợp Thập Cẩm",
    weight: "300g",
    ingredients: [
      "Vỏ Da Dợp gia truyền xốp giòn",
      "Nhân thập cẩm xá xíu đặc biệt",
      "3 lòng đỏ trứng muối nguyên quả",
      "Lạp xưởng nạc",
      "Hạt điều, mứt sen, mè thơm"
    ],
    shelfLife: "20 - 30 ngày (nguyên bao bì hút chân không); 4 - 6 ngày sau khi mở gói",
    storage: "Nơi khô ráo, thoáng mát (15 - 20°C) khi nguyên bao bì; sau khi mở gói nên bọc kín để ngăn mát tủ lạnh dùng trong 4 - 6 ngày",
    highlight: "3 trứng muối ngậy bùi, trọng lượng bánh đầm tay"
  },
  {
    id: '3',
    name: "Bánh Da Dợp 6-10-12-14 Trứng",
    shortName: "Da dợp 6-10-12-14 trứng",
    description: "Bánh trung thu da dợp ngoại cỡ cao cấp làm quà biếu tặng gia đình và doanh nghiệp.",
    longDescription: "Bánh Da Dợp ngoại cỡ (từ 6 đến 14 trứng) là tuyệt phẩm làm quà biếu độc đáo của Văn Hòa Lạc Vũng Tàu. Bánh kích thước lớn đòi hỏi tay nghề nướng than điêu luyện để vỏ bánh chín đều giòn xốp mà nhân vẫn giữ trọn vị ẩm béo và hương thơm thảo mộc tự nhiên.",
    price: "460.000đ",
    priceValue: 460000,
    image: "/images/banh-da-dop-big.png",
    slug: "da-dop-big",
    category: "Da Dợp Thập Cẩm",
    weight: "800g - 1.5kg (tùy chọn số trứng)",
    ingredients: [
      "Vỏ bánh Da Dợp xếp lớp thủ công",
      "6 - 14 lòng đỏ trứng muối",
      "Thập cẩm gà quay ngũ nhân",
      "Gia vị thảo mộc bí truyền từ 1970"
    ],
    shelfLife: "25 - 30 ngày (nguyên bao bì hút chân không); 5 - 7 ngày sau khi cắt bánh",
    storage: "Nơi khô ráo, thoáng mát khi nguyên gói; do bánh kích thước lớn, sau khi cắt nên bọc màng thực phẩm bảo quản ngăn mát tủ lạnh",
    highlight: "Kích thước đại, đẳng cấp làm quà biếu sang trọng"
  },
  {
    id: '4',
    name: "Trung Thu Nướng Đậu Xanh",
    shortName: "Đậu xanh",
    description: "Bánh nướng truyền thống nhân đậu xanh mịn màng, vị ngọt thanh tao Văn Hòa Lạc Vũng Tàu.",
    longDescription: "Bánh nướng Đậu Xanh Văn Hòa Lạc Vũng Tàu được làm từ hạt đậu xanh tuyển chọn, sên thủ công với lửa nhỏ để giữ được màu vàng óng tự nhiên cùng độ ngọt thanh, bùi mịn dịu nhẹ, không gắt họng.",
    price: "130.000đ",
    priceValue: 130000,
    image: "/images/mooncake-lotus.jpg",
    slug: "trung-thu-dau-xanh",
    category: "Trung Thu Nướng",
    weight: "250g (2 trứng)",
    ingredients: [
      "Vỏ bánh nướng truyền thống vàng óng",
      "Đậu xanh sên nhuyễn mịn",
      "2 lòng đỏ trứng muối",
      "Dầu thực vật cao cấp, đường phèn"
    ],
    shelfLife: "25 - 30 ngày (nguyên bao bì); 4 - 6 ngày sau khi mở gói",
    storage: "Nơi thoáng mát tránh ánh nắng; sau khi mở túi bảo quản ngăn mát tủ lạnh",
    highlight: "Đậu xanh thanh mát, ngọt dịu vừa vặn"
  },
  {
    id: '5',
    name: "Trung Thu Nướng Thập Cẩm",
    shortName: "Thập cẩm",
    description: "Bánh nướng truyền thống nhân thập cẩm xá xíu gia truyền chuẩn vị ký ức.",
    longDescription: "Bánh nướng Thập Cẩm là dòng bánh gắn liền với tên tuổi Văn Hòa Lạc Vũng Tàu hơn 50 năm qua. Hương thơm lá chanh thoang thoảng kết hợp với lạp xưởng nạc, thịt xá xíu và hạt dưa giòn rụm tạo nên hương vị Tết Trung Thu xưa không thể hòa lẫn.",
    price: "130.000đ",
    priceValue: 130000,
    image: "/images/mooncake-redbean.jpg",
    slug: "trung-thu-thap-cam",
    category: "Trung Thu Nướng",
    weight: "250g (2 trứng)",
    ingredients: [
      "Vỏ bánh nướng truyền thống",
      "Thịt xá xíu, lạp xưởng Mai Quế Lộ",
      "Mứt bí, mứt gừng, lá chanh",
      "2 lòng đỏ trứng muối"
    ],
    shelfLife: "25 - 30 ngày (nguyên bao bì); 4 - 6 ngày sau khi mở gói",
    storage: "Nơi thoáng mát tránh ánh nắng; sau khi mở túi bảo quản ngăn mát tủ lạnh",
    highlight: "Hương vị thập cẩm truyền thống xưa chuẩn gốc"
  },
  {
    id: '6',
    name: "Trung Thu Nướng Thập Cẩm Gà Quay",
    shortName: "Thập cẩm gà quay",
    description: "Bánh nướng thập cẩm gà quay ngũ vị thơm lừng, đậm đà hương vị gia truyền.",
    longDescription: "Bánh nướng Thập Cẩm Gà Quay Văn Hòa Lạc Vũng Tàu kết hợp từng sợi ức gà xé sợi tẩm ướp ngũ vị hương cùng lạp xưởng, mỡ đường và trứng muối hảo hạng, mang lại trải nghiệm vị giác đậm đà quyến rũ.",
    price: "140.000đ",
    priceValue: 140000,
    image: "/images/mooncake-redbean.jpg",
    slug: "trung-thu-ga-quay",
    category: "Trung Thu Nướng",
    weight: "250g (2 trứng)",
    ingredients: [
      "Thịt gà quay tẩm ướp thảo mộc",
      "Lạp xưởng nạc, mứt sen",
      "2 lòng đỏ trứng muối",
      "Hạt điều rang, hạt bí"
    ],
    shelfLife: "25 - 30 ngày (nguyên bao bì); 4 - 6 ngày sau khi mở gói",
    storage: "Nơi thoáng mát tránh ánh nắng; sau khi mở túi bảo quản ngăn mát tủ lạnh",
    highlight: "Thịt gà quay đậm vị, trứng muối dẻo bùi"
  },
  {
    id: '7',
    name: "Trung Thu Nướng Dừa Mè",
    shortName: "Dừa mè",
    description: "Bánh nướng nhân dừa mè ngọt thanh thơm béo từ cơm dừa tươi tuyển chọn.",
    longDescription: "Bánh nướng Dừa Mè Văn Hòa Lạc Vũng Tàu sử dụng cơm dừa nạo sợi tươi non sên cùng mè vàng rang thơm phức, tạo nên vị ngọt béo giòn sần sật khó cưỡng khi thưởng cùng tách trà sen nóng.",
    price: "115.000đ",
    priceValue: 115000,
    image: "/images/mooncake-lotus.jpg",
    slug: "trung-thu-dua-me",
    category: "Trung Thu Nướng",
    weight: "250g (2 trứng)",
    ingredients: [
      "Cơm dừa tươi nạo sợi",
      "Mè vàng rang thơm",
      "2 lòng đỏ trứng muối",
      "Đường cát trắng tinh khiết"
    ],
    shelfLife: "20 - 25 ngày (nguyên bao bì); 4 - 6 ngày sau khi mở gói",
    storage: "Nơi thoáng mát tránh ánh nắng; sau khi mở túi bảo quản ngăn mát tủ lạnh",
    highlight: "Cơm dừa sần sật ngọt ngào thơm nức mùi mè rang"
  }
]

export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map(p => p.slug)
}
