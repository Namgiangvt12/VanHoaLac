from pydantic import BaseModel
from typing import List, Optional

class OrderItemSchema(BaseModel):
    product_name: str
    unit_price: int
    quantity: int

class OrderCreateSchema(BaseModel):
    customer_name: str
    customer_phone: Optional[str] = ""
    customer_address: Optional[str] = ""
    receive_date: str
    discount: int = 0
    shipping_fee: int = 0
    deposit: int = 0
    pay_ship_now: bool = False
    full_pay: bool = False
    notes: Optional[str] = ""
    items: List[OrderItemSchema]

class OrderUpdateSchema(BaseModel):
    customer_name: str
    customer_phone: Optional[str] = ""
    customer_address: Optional[str] = ""
    receive_date: str
    discount: int = 0
    deposit: int = 0
    shipping_fee: int = 0
    notes: Optional[str] = ""
    items: List[OrderItemSchema]

class PaymentCreateSchema(BaseModel):
    amount: int
    type: str # 'deposit', 'full', 'shipping', 'other'
    method: Optional[str] = ""
