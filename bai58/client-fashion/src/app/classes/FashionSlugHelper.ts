// Slug Fashion có dạng: ten-fashion-f12  (f + IdF số, duy nhất)
export function createFashionSlug(subject: string, idF: number): string {
  const sanitized = (subject || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .substring(0, 80)
    .replace(/-$/, '');
  return `${sanitized}-f${idF}`;
}

// Phân tích slug để lấy IdF; hỗ trợ cả số thuần ("12") lẫn slug ("ten-f12")
export function extractIdFFromSlug(slug: string): number | null {
  if (/^\d+$/.test(slug)) return parseInt(slug, 10);
  const match = slug.match(/-f(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}
