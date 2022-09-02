import { GridItemType } from "../../types/GridItemType"
import * as C from "./styles"
import defaultImg from "../../svgs/default.svg"
import { items } from "../../data/items"

type Props = {
  item: GridItemType
  onClick: () => void
}

export const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container
      showBackground={item.permanentShow || item.show}
      onClick={onClick}
    >
      {item.permanentShow === false && item.show === false && (
        <C.Icon src={defaultImg} alt='' opacity={0.1} />
      )}
      {(item.permanentShow || item.show) && item.item != null && (
        <C.Icon src={items[item.item].icon} alt='' />
      )}
    </C.Container>
  )
}
