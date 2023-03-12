
const React = require('react')
const Default = require('./layouts/Default')

function Index({breads, title}) {
    return (
        <Default title={title}>
            <h2>Index Page</h2>
            {/* <p>My favorite bread is {breads[1].name}!</p> */}

            <ul>
                {
                    breads.map((bread, index) => {
                        return (
                        <li key={index}>
                            <a href={`/breads/${index}`}>
                                {bread.name}
                            </a>
                        </li>
                        )
                    })
                }
            </ul>
        </Default>
    )
}

module.exports = Index