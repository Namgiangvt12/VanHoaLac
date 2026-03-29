-- Insert sample products
INSERT INTO products (name, slug, description, price, image_url, category, in_stock, featured) VALUES
('Bánh Trung Thu Nhân Hạt Sen', 'banh-hat-sen', 'Bánh trung thu Văn Hòa Lạc nhân hạt sen Huế truyền thống với kết cấu mịn màng như lụa', 200000, '/images/mooncake-lotus.jpg', 'Bánh Trung Thu', true, true),
('Bánh Trung Thu Nhân Đậu Đỏ', 'banh-dau-do', 'Bánh trung thu Văn Hòa Lạc nhân đậu đỏ azuki Nhật Bản ngọt dịu với hương vị đất nhẹ', 360000, '/images/mooncake-redbean.jpg', 'Bánh Trung Thu', true, false)
ON CONFLICT (slug) DO NOTHING;