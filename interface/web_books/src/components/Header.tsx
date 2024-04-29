type HeaderProps = {
  booksFC: void,
  writersFC: void,
  authFC: void,
  createFC: void
}


function Header(props: HeaderProps) {
  return (
    <div>
      <header>
        <span onClick={props.createFC}>create book</span>
        <span onClick={props.booksFC}>books</span>
        <b>Books</b>
        <span onClick={props.writersFC}>writers</span>
        <span onClick={props.authFC}>sign up/in</span>
      </header>
    </div>
  )
  
}
export default Header
