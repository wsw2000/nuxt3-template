const isNullable = (v: any): v is undefined | null => v === undefined || v === null

export default isNullable
