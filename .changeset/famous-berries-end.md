---
'@ponjimon/utils': major
---

StringUtil now implements how Deno converts from and to base64

### Breaking changes

- Output base64 strings are no longer cleaned, but StringUtil now exposes a cleanBase64String method
