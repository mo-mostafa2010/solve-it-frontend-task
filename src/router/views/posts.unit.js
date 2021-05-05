import Posts from './posts'

describe('@views/posts', () => {
  it('is a valid view', () => {
    expect(Posts).toBeAViewComponent()
  })
})
