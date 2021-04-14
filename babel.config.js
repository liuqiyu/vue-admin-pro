const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = [
  [
    'component',
    {
      'libraryName': 'asp-smart-layout',
      style: false
    }
  ]
]

plugins.push('@babel/plugin-transform-modules-umd')
if (IS_PROD) {
  plugins.push('transform-remove-console')
}
module.exports = {
  plugins: plugins,
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry'
    }]
  ]
}
