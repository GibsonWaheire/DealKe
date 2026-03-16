import { WA_NUMBER } from '../../data/homeData'

export const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export const parsePrice = (str) => parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0
