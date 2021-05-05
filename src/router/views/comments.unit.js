import Comments from './comments'

describe('@views/comments', () => {
  it('is a valid view', () => {
    expect(Comments).toBeAViewComponent()
  })
})
