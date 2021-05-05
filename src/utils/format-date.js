// https://date-fns.org/docs/format
import format from 'date-fns/format'

export default function formatDate(date) {
  return format(date, 'dd-MM-yyyy HH:mm:ss:aa')
}
