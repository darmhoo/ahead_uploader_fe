export type SelectOption<T = string | number> = {
    label: string
    value: T
}

export interface User {
    id: number
    name: string
    email: string
    token: string
    is_admin: boolean
}

export type FieldConfig =
    | {
        name: string
        label?: string
        type: 'text' | 'file'
    }
    | {
        name: string
        label?: string
        type: 'select'
        options: SelectOption[]
    }


export interface DataResponse<T> {
    data: T
    message: string
    status: string
}

export interface PaginatedResponse<T> {
    data: T[]
    current_page: number
    total: number
    per_page: number
    last_page: number
    from: number
    to: number

    first_page_url: string | null
    last_page_url: string | null
    next_page_url: string | null
    prev_page_url: string | null
    path: string
}

export interface TableAction {
    icon: Component
    class?: string
    handler: (row: any) => void
    name: string
    variant?: string
}

export type StatusConfig = {
    value: string
    label: string
    class: string
    clickable?: boolean
}

export interface paginationProps {
    total: number
    per_page: number
    current_page: number
    last_page: number
    from: number
}

export type DisplayCellResult =
    | string
    | {
        text: string
        class?: string
        isBadge?: boolean
        clickable?: boolean
        message?: string
    }

