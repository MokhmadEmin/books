function Header(props) {
  return (
    <div>
      <header><span onClick={props.booksFC}>books</span><b>Books</b><span onClick={props.writersFC}>writers</span></header>
    </div>
  )
  
}
export default Header
