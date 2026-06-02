import re

with open("app/esp32/page.js", "r") as f:
    content = f.read()

# Remove use client
content = content.replace('"use client";\n\n', '')
# Replace imports and FadeIn
content = re.sub(
    r'import React, \{ useEffect, useRef, useState \} from "react";\nimport Image from "next/image";\nimport \{ Header \} from "@/components/Header";\n\n/\* ─── FadeIn with animation recycling ─── \*/\n.*?function FadeIn.*?return \(\n.*?</div>\n  \);\n}\n\n\n',
    'import Image from "next/image";\nimport { Header } from "@/components/Header";\nimport { FadeIn, ESP32Hero } from "@/components/ClientIslands";\n\n',
    content,
    flags=re.DOTALL
)

# Replace hero hooks
content = re.sub(
    r'export default function ESP32Page\(\) \{\n  const heroRef = useRef\(null\);\n.*?return \(\n    <main',
    'export default function ESP32Page() {\n\n  return (\n    <main',
    content,
    flags=re.DOTALL
)

# Replace hero JSX
content = re.sub(
    r'      \{/\* ── Hero Section ── \*/\}\n      <section.*?</section>',
    '      <ESP32Hero />',
    content,
    flags=re.DOTALL
)

with open("app/esp32/page.js", "w") as f:
    f.write(content)


with open("app/s21-mod/page.js", "r") as f:
    content = f.read()

content = content.replace('"use client";\n\n', '')
content = re.sub(
    r'import React, \{ useEffect, useRef, useState \} from "react";\nimport \{ Header \} from "@/components/Header";\n\nfunction FadeIn.*?return \(\n.*?</div>\n  \);\n}\n\n',
    'import { Header } from "@/components/Header";\nimport { FadeIn, S21Hero } from "@/components/ClientIslands";\n\n',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'export default function S21ModPage\(\) \{\n  const heroRef = useRef\(null\);\n.*?return \(\n    <main',
    'export default function S21ModPage() {\n\n  return (\n    <main',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'      \{/\* Hero Section \*/\}\n      <section.*?</section>',
    '      <S21Hero />',
    content,
    flags=re.DOTALL
)

with open("app/s21-mod/page.js", "w") as f:
    f.write(content)

