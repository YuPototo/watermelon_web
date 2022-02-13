import { getSearchTerm } from '../getSearchTerm'

test('getSearchTerm', () => {
    expect(getSearchTerm('?from=abc&name=123', 'from')).toBe('abc')
    expect(getSearchTerm('?from=abc&name=123', 'name')).toBe('123')

    expect(() => getSearchTerm('?from=abc&name=123', 'noTerm')).toThrowError()
})
