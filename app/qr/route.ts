import { redirect } from 'next/navigation'

const MAPS_URL =
  'https://www.google.com/maps/place/B%C3%A1nh+Trung+Thu+V%C4%83n+H%C3%B2a+L%E1%BA%A1c+V%C5%A9ng+T%C3%A0u/@10.3585406,107.076507,1069m/data=!3m2!1e3!4b1!4m6!3m5!1s0x31756f7c553778ed:0x932f5ef477b3d205!8m2!3d10.3585353!4d107.0790819!16s%2Fg%2F11lf6vqpdd?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D'

export async function GET() {
  redirect(MAPS_URL)
}
