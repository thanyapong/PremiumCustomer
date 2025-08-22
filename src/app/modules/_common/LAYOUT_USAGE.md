# MainLayout Component Usage Guide

## เปลี่ยนแปลงล่าสุด

`MainLayout` component ได้รับการอัปเดตเพื่อให้มีความยืดหยุ่นมากขึ้นในการกำหนด content section

## การใช้งาน contentComponent (แนะนำ)

### วิธีใหม่: ส่ง contentComponent ทั้งหมดจากข้างนอก

```tsx
import { MainLayout, Header, Footer } from "../modules/_common/commonDesign";
import { CenteredContent, FullScreenContent, CustomContent } from "../modules/_common/components";

// ตัวอย่างการใช้ CenteredContent
<MainLayout
    backgroundImage="/images/background.png"
    headerComponent={<Header logoSrc="/images/logo.png" />}
    footerComponent={<Footer callCenterText="Call Center โทร 1434" />}
    contentComponent={
        <CenteredContent
            boxSx={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: 5,
                borderRadius: 3,
                borderColor: "#47B5F9",
                borderWidth: 2,
                borderStyle: "solid",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography>Your content here</Typography>
        </CenteredContent>
    }
/>

// ตัวอย่างการใช้ FullScreenContent
<MainLayout
    backgroundImage="/images/background.png"
    contentComponent={
        <FullScreenContent sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <Typography>Full screen content</Typography>
        </FullScreenContent>
    }
/>

// ตัวอย่างการใช้ CustomContent
<MainLayout
    backgroundImage="/images/background.png"
    contentComponent={
        <CustomContent
            containerSx={{ minHeight: "90vh" }}
            gridProps={{ xs: 12, sm: 10, md: 8 }}
            boxSx={{ padding: 3, backgroundColor: "white" }}
        >
            <Typography>Custom content</Typography>
        </CustomContent>
    }
/>
```

## Content Components ที่มีให้ใช้

### 1. CenteredContent

-   เหมาะสำหรับเนื้อหาที่ต้องการแสดงกึ่งกลางหน้าจอ
-   รองรับการกำหนด Grid breakpoints และ Box styling

```tsx
<CenteredContent
    xs={11} // ขนาดบน mobile (default: 11)
    sm={9} // ขนาดบน tablet (default: 9)
    md={6} // ขนาดบน desktop (default: 6)
    lg={5} // ขนาดบน large desktop (default: 5)
    boxSx={{
        // กำหนดสไตล์ของ Box
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: 4,
        borderRadius: 2,
    }}
>
    {children}
</CenteredContent>
```

### 2. FullScreenContent

-   เหมาะสำหรับเนื้อหาที่ต้องการแสดงเต็มหน้าจอ

```tsx
<FullScreenContent
    sx={{
        // กำหนดสไตล์เพิ่มเติม
        backgroundColor: "rgba(0,0,0,0.3)",
        backgroundImage: "url('/images/bg.jpg')",
    }}
>
    {children}
</FullScreenContent>
```

### 3. CustomContent

-   ยืดหยุ่นที่สุด สามารถกำหนดทุกอย่างได้

```tsx
<CustomContent
    containerSx={{
        // สไตล์ของ Grid container
        minHeight: "80vh",
        padding: 2,
    }}
    gridProps={{
        // props ของ Grid item
        xs: 12,
        sm: 10,
        md: 8,
        lg: 6,
        xl: 4,
    }}
    boxSx={{
        // สไตล์ของ Box
        backgroundColor: "white",
        padding: 3,
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    }}
>
    {children}
</CustomContent>
```

## วิธีเดิมที่ยังใช้ได้ (Backward Compatibility)

```tsx
// วิธีเดิมยังคงใช้ได้
<MainLayout
    backgroundImage="/images/background.png"
    contentBoxProps={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: 4,
        borderRadius: 2,
    }}
>
    <Typography>Your content here</Typography>
</MainLayout>
```

## ข้อดีของวิธีใหม่

1. **ความยืดหยุ่นสูง**: สามารถกำหนด Grid layout และ styling ได้อย่างอิสระ
2. **แยกความรับผิดชอบ**: Layout และ Content แยกจากกันชัดเจน
3. **ใช้ซ้ำได้**: Content components สามารถนำไปใช้ในที่อื่นได้
4. **TypeScript Support**: รองรับ type checking เต็มรูปแบบ
5. **Responsive**: รองรับการแสดงผลบนหน้าจอหลากหลายขนาด

## Migration Guide

### เปลี่ยนจาก contentBoxProps เป็น contentComponent

**เดิม:**

```tsx
<MainLayout contentBoxProps={{ padding: 4, backgroundColor: "white" }}>
    <Typography>Content</Typography>
</MainLayout>
```

**ใหม่:**

```tsx
<MainLayout
    contentComponent={
        <CenteredContent boxSx={{ padding: 4, backgroundColor: "white" }}>
            <Typography>Content</Typography>
        </CenteredContent>
    }
/>
```
