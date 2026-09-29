import React, { FunctionComponent, useMemo } from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import queryString, { ParsedQuery } from 'query-string'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList'
import { PostListItemType } from 'types/PostItem.types'
import { useLayout } from 'contexts/LayoutContext'

import LogoImage from 'components/Main/LogoImage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

type AsideProps = {
  logoImage: IGatsbyImageData
  edges: PostListItemType[]
  search: string
}

const Aside: FunctionComponent<AsideProps> = function ({
  logoImage,
  edges,
  search,
}) {
  const { closeSidebar } = useLayout()
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  const categoryList = useMemo(() => {
    const counts = edges.reduce(
      (
        list: CategoryListProps['categoryList'],
        {
          node: {
            frontmatter: { categories },
          },
        }: PostListItemType,
      ) => {
        categories.forEach(category => {
          if (list[category] === undefined) list[category] = 1
          else list[category]++
        })

        list['All']++

        return list
      },
      { All: 0 },
    )

    // All은 맨 앞에 두고 나머지 카테고리는 ABC순으로 정렬
    const { All, ...rest } = counts
    return Object.keys(rest)
      .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
      .reduce(
        (sorted: CategoryListProps['categoryList'], key) => {
          sorted[key] = rest[key]
          return sorted
        },
        { All },
      )
  }, [edges])
  const { pathname } = useLocation()

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) closeSidebar()
  }

  return (
    <aside id="aside" onClick={handleClick}>
      <div className="inner">
        <div className="aside-head">
          <Link to="/">
            <LogoImage logoImage={logoImage} />
          </Link>
          <Link to="/" className="line-home">
            <h1>aluvy</h1>
            <p className="desc">aluvy Blog</p>
          </Link>
        </div>
        <div id="lnb" className="aside-body">
          <CategoryList
            selectedCategory={selectedCategory}
            categoryList={categoryList}
          />
          <div className="page-list">
            <ul>
              <li>
                <Link to="/pages/guide/" className="page-link">
                  Posting Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="aside-foot">
          <div className="foot-links">
            <a
              href="https://github.com/aluvy"
              target="_blank"
              className="foot-links-item"
            >
              <FontAwesomeIcon icon={faGithub} className="ico" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Aside
