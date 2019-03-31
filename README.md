# use-battery-hook

> A react hook to get battery status

[![NPM](https://img.shields.io/npm/v/use-battery-hook.svg)](https://www.npmjs.com/package/use-battery-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-battery-hook
```

## Usage

```jsx
import React from 'react'

import useBattery from 'use-battery-hook'

const Example = () => {
  const { charging, chargingTime, dischargingTime, level } = useBattery();
  return (
    <MyComponent />
  )
}
```

## License

MIT © [skyrbe](https://github.com/skyrbe)
