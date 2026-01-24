import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DisplayCellResult, StatusConfig } from "../types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatLabel(label: string): string {
  if (!label) return ''

  return label
    // camelCase → camel Case
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // kebab-case → kebab case
    .replace(/-/g, ' ')
    // snake_case → snake case
    .replace(/_/g, ' ')
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase())
}

export function displayCell(
  row: Record<string, any>,
  column: string,
  statuses?: StatusConfig[]
) {
  const value = getNestedValue(row, column)

  if (value === null || value === undefined || value === '') return '-'

  // Status badge
  if (column === 'status' && statuses && typeof value === 'string') {
    const status = statuses.find(s => s.value === value)

    if (status) {
      return {
        text: status.label,
        class: `inline-flex cursor-pointer items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.class}`,
        clickable: value === 'error',
        message: row.error_message, // <-- from your payload
      }
    }
  }

  // Dates
  if (column.toLowerCase().includes('date') || column.toLowerCase().includes('created_at') || column.toLowerCase().includes('updated_at')) {
    return new Date(value).toLocaleDateString()
  }

  //objects and arrays
  if (typeof value === 'object' && value !== null) {
    return value.name || JSON.stringify(value)
  }

  return String(value)
}




function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object') {
      return acc[key]
    }
    return undefined
  }, obj)
}

export const STATUS_BADGES: StatusConfig[] = [
  { value: 'pending', label: 'Pending', class: 'bg-yellow-100 text-yellow-800' },
  { value: 'processing', label: 'Processing', class: 'bg-blue-100 text-blue-800' },
  { value: 'awaiting_approval', label: 'Awaiting Approval', class: 'bg-purple-100 text-purple-800' },
  { value: 'approved', label: 'Approved', class: 'bg-green-100 text-green-800' },
  { value: 'rejected', label: 'Rejected', class: 'bg-red-100 text-red-800' },
  { value: 'error', label: 'Error', class: 'bg-red-100 text-red-800', clickable: true },
  { value: 'success', label: 'Success', class: 'bg-green-100 text-green-800' },
  { value: 'inactive', label: 'Inactive', class: 'bg-gray-100 text-gray-800' },
]


