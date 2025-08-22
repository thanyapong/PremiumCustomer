import { Typography, Box } from "@mui/material";
import { Header } from "../../_common/commonDesign";

const Error = () => {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#fff",
                position: "relative",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 4,
                    p: 3,
                }}
            >
                {/* Error Animation */}
                <Box
                    sx={{
                        width: { xs: 350, sm: 450, md: 550 },
                        height: { xs: 300, sm: 350, md: 400 },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        mb: 2,
                    }}
                >
                    {/* Warning Circle with Exclamation Mark */}
                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 10, // วงกลมอยู่ด้านหน้า
                            animation: "circle-rocket-up 1s ease-out both", // animation ใหม่แบบพุ่งขึ้นมา
                            transform: "translateY(200px) scale(0)",
                            "@keyframes circle-rocket-up": {
                                "0%": {
                                    transform: "translateY(200px) scale(0) rotateY(0deg)",
                                    opacity: 0,
                                },
                                "30%": {
                                    transform: "translateY(50px) scale(0.8) rotateY(216deg)", // 0.6 รอบ
                                    opacity: 0.7,
                                },
                                "60%": {
                                    transform: "translateY(-10px) scale(1.2) rotateY(432deg)", // 1.2 รอบ
                                    opacity: 1,
                                },
                                "80%": {
                                    transform: "translateY(5px) scale(0.9) rotateY(648deg)", // 1.8 รอบ
                                    opacity: 1,
                                },
                                "100%": {
                                    transform: "translateY(0px) scale(1) rotateY(720deg)", // 2 รอบเต็ม แบบเหรียญ
                                    opacity: 1,
                                },
                            },
                        }}
                    >
                        {/* Outer Circle */}
                        <Box
                            sx={{
                                width: { xs: 160, sm: 200, md: 240 },
                                height: { xs: 160, sm: 200, md: 240 },
                                backgroundColor: "#ff4757",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                boxShadow: "0 15px 40px rgba(255, 71, 87, 0.4)",
                                animation: "warning-pulse 2s ease-in-out 1s infinite", // เร็วขึ้นจาก 3s → 2s, delay จาก 1.5s → 1s
                                "@keyframes warning-pulse": {
                                    "0%, 100%": {
                                        transform: "scale(1)",
                                        boxShadow: "0 15px 40px rgba(255, 71, 87, 0.4)",
                                    },
                                    "50%": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 20px 50px rgba(255, 71, 87, 0.6)",
                                    },
                                },
                            }}
                        >
                            {/* Inner White Circle */}
                            <Box
                                sx={{
                                    width: { xs: 135, sm: 170, md: 200 },
                                    height: { xs: 135, sm: 170, md: 200 },
                                    backgroundColor: "#fff",
                                    borderRadius: "50%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                {/* Exclamation Line */}
                                <Box
                                    sx={{
                                        width: { xs: 8, sm: 10, md: 12 },
                                        height: { xs: 50, sm: 65, md: 80 },
                                        backgroundColor: "#ff4757",
                                        borderRadius: "4px",
                                        animation: "exclamation-line 0.6s ease-out 0.4s both", // เร็วขึ้นจาก 1s → 0.6s, delay จาก 0.8s → 0.4s
                                        transform: "scaleY(0)",
                                        transformOrigin: "bottom",
                                        "@keyframes exclamation-line": {
                                            "0%": {
                                                transform: "scaleY(0)",
                                                opacity: 0,
                                            },
                                            "70%": {
                                                transform: "scaleY(1.1)",
                                                opacity: 1,
                                            },
                                            "100%": {
                                                transform: "scaleY(1)",
                                                opacity: 1,
                                            },
                                        },
                                    }}
                                />

                                {/* Exclamation Dot */}
                                <Box
                                    sx={{
                                        width: { xs: 10, sm: 12, md: 15 },
                                        height: { xs: 10, sm: 12, md: 15 },
                                        backgroundColor: "#ff4757",
                                        borderRadius: "50%",
                                        animation: "exclamation-dot 0.4s ease-out 0.8s both", // เร็วขึ้นจาก 0.6s → 0.4s, delay จาก 1.2s → 0.8s
                                        transform: "scale(0)",
                                        "@keyframes exclamation-dot": {
                                            "0%": {
                                                transform: "scale(0)",
                                                opacity: 0,
                                            },
                                            "70%": {
                                                transform: "scale(1.3)",
                                                opacity: 1,
                                            },
                                            "100%": {
                                                transform: "scale(1)",
                                                opacity: 1,
                                            },
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Speed Lines - ขีดความเร็ว 4 ขีด แนวตั้ง ด้านข้างวงกลม */}
                    {/* Left Speed Lines - 2 ขีดข้างกัน */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: "20%",
                            top: "60%",
                            transform: "translateY(-50%)",
                            zIndex: 8,
                            display: "flex",
                            gap: 0.5, // ระยะห่างระหว่างขีด
                            animation: "speed-line-vertical 0.4s ease-out 0.3s both", // เพิ่ม delay จาก 0s → 0.3s
                            opacity: 0,
                            "@keyframes speed-line-vertical": {
                                "0%": { opacity: 0, transform: "translateY(-50%) translateY(50px)" },
                                "20%": { opacity: 1, transform: "translateY(-50%) translateY(0px)" },
                                "80%": { opacity: 1, transform: "translateY(-50%) translateY(0px)" },
                                "100%": { opacity: 0, transform: "translateY(-50%) translateY(-50px)" },
                            },
                        }}
                    >
                        {/* ขีดนอกสุด - สั้น */}
                        <Box
                            sx={{
                                width: 2.5,
                                height: { xs: 25, sm: 30, md: 35 },
                                backgroundColor: "#ff4757",
                                borderRadius: "2px",
                                animation: "speed-line-draw-left-0 0.4s ease-out 0.3s both", // เพิ่ม delay จาก 0s → 0.3s
                                transform: "scaleY(0)",
                                transformOrigin: "bottom",
                                "@keyframes speed-line-draw-left-0": {
                                    "0%": { transform: "scaleY(0)", opacity: 0 },
                                    "20%": { transform: "scaleY(1)", opacity: 1 },
                                    "80%": { transform: "scaleY(1)", opacity: 0.8 },
                                    "100%": { transform: "scaleY(0)", opacity: 0 },
                                },
                            }}
                        />
                        {/* ขีดใน - ยาวและสูงขึ้น */}
                        <Box
                            sx={{
                                width: 3,
                                height: { xs: 35, sm: 45, md: 55 },
                                backgroundColor: "#ff4757",
                                borderRadius: "2px",
                                transform: "translateY(-8px) scaleY(0)", // ปรับตำแหน่งให้สูงขึ้น 8px
                                transformOrigin: "bottom",
                                animation: "speed-line-draw-left-1 0.4s ease-out 0.35s both", // เพิ่ม delay จาก 0.02s → 0.35s
                                "@keyframes speed-line-draw-left-1": {
                                    "0%": { transform: "translateY(-8px) scaleY(0)", opacity: 0 },
                                    "20%": { transform: "translateY(-8px) scaleY(1)", opacity: 1 },
                                    "80%": { transform: "translateY(-8px) scaleY(1)", opacity: 0.8 },
                                    "100%": { transform: "translateY(-8px) scaleY(0)", opacity: 0 },
                                },
                            }}
                        />
                    </Box>

                    {/* Right Speed Lines - 2 ขีดข้างกัน */}
                    <Box
                        sx={{
                            position: "absolute",
                            right: "20%",
                            top: "60%",
                            transform: "translateY(-50%)",
                            zIndex: 8,
                            display: "flex",
                            gap: 0.5, // ระยะห่างระหว่างขีด
                            animation: "speed-line-vertical 0.4s ease-out 0.35s both", // เพิ่ม delay จาก 0.02s → 0.35s
                            opacity: 0,
                        }}
                    >
                        {/* ขีดใน - ยาวและสูงขึ้น */}
                        <Box
                            sx={{
                                width: 3,
                                height: { xs: 38, sm: 48, md: 58 },
                                backgroundColor: "#ff4757",
                                borderRadius: "2px",
                                transform: "translateY(-8px) scaleY(0)", // ปรับตำแหน่งให้สูงขึ้น 8px
                                transformOrigin: "bottom",
                                animation: "speed-line-draw-right-0 0.4s ease-out 0.35s both", // เพิ่ม delay จาก 0.02s → 0.35s
                                "@keyframes speed-line-draw-right-0": {
                                    "0%": { transform: "translateY(-8px) scaleY(0)", opacity: 0 },
                                    "20%": { transform: "translateY(-8px) scaleY(1)", opacity: 1 },
                                    "80%": { transform: "translateY(-8px) scaleY(1)", opacity: 0.8 },
                                    "100%": { transform: "translateY(-8px) scaleY(0)", opacity: 0 },
                                },
                            }}
                        />
                        {/* ขีดนอกสุด - สั้น */}
                        <Box
                            sx={{
                                width: 2.5,
                                height: { xs: 28, sm: 33, md: 38 },
                                backgroundColor: "#ff4757",
                                borderRadius: "2px",
                                animation: "speed-line-draw-right-1 0.4s ease-out 0.4s both", // เพิ่ม delay จาก 0.04s → 0.4s
                                transform: "scaleY(0)",
                                transformOrigin: "bottom",
                                "@keyframes speed-line-draw-right-1": {
                                    "0%": { transform: "scaleY(0)", opacity: 0 },
                                    "20%": { transform: "scaleY(1)", opacity: 1 },
                                    "80%": { transform: "scaleY(1)", opacity: 0.8 },
                                    "100%": { transform: "scaleY(0)", opacity: 0 },
                                },
                            }}
                        />
                    </Box>

                    {/* Floating Warning Symbols - กระจายมั่วๆ แล้วหายไป */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
                        const symbols = [
                            "×",
                            ,
                            "+",
                            "!",
                            "?",
                            "⚠",
                            "×",
                            "+",
                            "!",
                            "⚠",
                            "×",
                            "+",
                            "?",
                            "!",
                            "×",
                            "+",
                            "⚠",
                        ];
                        const randomAngle = ((i * 22.5 + Math.sin(i) * 45) * Math.PI) / 180; // มุมสุ่มมากขึ้น
                        const randomDistance = 80 + Math.random() * 80; // ระยะทางสุ่ม 80-160px (แคบลง)
                        const randomSize = 12 + Math.random() * 12; // ขนาดสุ่ม 12-24px
                        const randomOpacity = 0.4 + Math.random() * 0.4; // ความใสสุ่ม 0.4-0.8

                        return (
                            <Box
                                key={i}
                                sx={{
                                    position: "absolute",
                                    color: "#ff4757",
                                    fontSize: randomSize,
                                    fontWeight: "bold",
                                    opacity: 0,
                                    zIndex: 5,
                                    animation: `symbol-scatter-${i} 1.2s ease-out ${1.0 + i * 0.05}s both`,
                                    transform: "translate(0px, 0px) scale(0)",
                                    [`@keyframes symbol-scatter-${i}`]: {
                                        "0%": {
                                            opacity: 0,
                                            transform: "translate(0px, 0px) scale(0) rotate(0deg)",
                                        },
                                        "10%": {
                                            opacity: 0.3,
                                            transform: `translate(${Math.cos(randomAngle) * -15}px, ${
                                                Math.sin(randomAngle) * -15
                                            }px) scale(0.6) rotate(${Math.random() * 180}deg)`,
                                        },
                                        "25%": {
                                            opacity: 1,
                                            transform: `translate(${Math.cos(randomAngle) * 30}px, ${
                                                Math.sin(randomAngle) * 30
                                            }px) scale(1.4) rotate(${180 + Math.random() * 180}deg)`,
                                        },
                                        "50%": {
                                            opacity: randomOpacity,
                                            transform: `translate(${Math.cos(randomAngle) * randomDistance}px, ${
                                                Math.sin(randomAngle) * randomDistance
                                            }px) scale(1) rotate(${360 + Math.random() * 360}deg)`,
                                        },
                                        "75%": {
                                            opacity: randomOpacity * 0.6,
                                            transform: `translate(${Math.cos(randomAngle) * (randomDistance + 30)}px, ${
                                                Math.sin(randomAngle) * (randomDistance + 30)
                                            }px) scale(0.8) rotate(${540 + Math.random() * 180}deg)`,
                                        },
                                        "100%": {
                                            opacity: 0,
                                            transform: `translate(${Math.cos(randomAngle) * (randomDistance + 50)}px, ${
                                                Math.sin(randomAngle) * (randomDistance + 50)
                                            }px) scale(0.3) rotate(${720 + Math.random() * 180}deg)`,
                                        },
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        animation: `symbol-wobble-${i} 0.5s ease-in-out ${1.0 + i * 0.03}s both`,
                                        [`@keyframes symbol-wobble-${i}`]: {
                                            "0%, 100%": {
                                                transform: "rotate(0deg) scale(1)",
                                            },
                                            "25%": {
                                                transform: `rotate(${-15 + Math.random() * 30}deg) scale(${
                                                    0.9 + Math.random() * 0.3
                                                })`,
                                            },
                                            "75%": {
                                                transform: `rotate(${15 + Math.random() * 30}deg) scale(${
                                                    1.1 + Math.random() * 0.2
                                                })`,
                                            },
                                        },
                                    }}
                                >
                                    {symbols[i]}
                                </Box>
                            </Box>
                        );
                    })}

                    {/* Additional small particles */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <Box
                            key={`particle-${i}`}
                            sx={{
                                position: "absolute",
                                width: 4,
                                height: 4,
                                backgroundColor: "#ff4757",
                                borderRadius: "50%",
                                animation: `warning-particle-${i} ${2 + i * 0.3}s ease-in-out ${2 + i * 0.2}s infinite`, // เร็วขึ้นจาก 3s → 2s, delay จาก 3s → 2s
                                opacity: 0,
                                [`@keyframes warning-particle-${i}`]: {
                                    "0%, 100%": {
                                        opacity: 0,
                                        transform: `translate(${(i - 2) * 30}px, ${Math.sin(i) * 40}px) scale(0)`,
                                    },
                                    "50%": {
                                        opacity: 0.8,
                                        transform: `translate(${(i - 2) * 80}px, ${Math.sin(i) * 80}px) scale(1.5)`,
                                    },
                                },
                            }}
                        />
                    ))}
                </Box>

                {/* Error Text */}
                <Box sx={{ textAlign: "center", maxWidth: 600 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: "#ff4757",
                            fontSize: { xs: 28, sm: 36, md: 44 },
                            mb: 2,
                            animation: "fade-in-up 0.8s ease-out 1.3s both", // เร็วขึ้นจาก 1s → 0.8s, delay จาก 3s → 2s
                            opacity: 0,
                            transform: "translateY(30px)",
                            "@keyframes fade-in-up": {
                                "0%": {
                                    opacity: 0,
                                    transform: "translateY(30px)",
                                },
                                "100%": {
                                    opacity: 1,
                                    transform: "translateY(0)",
                                },
                            },
                        }}
                    >
                        ERROR!
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: "#666",
                            fontSize: { xs: 16, sm: 18, md: 20 },
                            mb: 2,
                            animation: "fade-in-up 0.8s ease-out 1.5s both", // เร็วขึ้นจาก 1s → 0.8s, delay จาก 3.3s → 2.2s
                            opacity: 0,
                            transform: "translateY(30px)",
                            lineHeight: 1.6,
                        }}
                    >
                        เกิดข้อผิดพลาดบางประการ กรุณากลับเข้ามาใหม่ภายหลัง
                    </Typography>
                </Box>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        width: { xs: "100%", sm: "auto" },
                        maxWidth: 400,
                        animation: "fade-in-up 0.8s ease-out 2.8s both", // เร็วขึ้นจาก 1s → 0.8s, delay จาก 4s → 2.8s
                        opacity: 0,
                        transform: "translateY(30px)",
                    }}
                />
            </Box>
        </Box>
    );
};

export default Error;
