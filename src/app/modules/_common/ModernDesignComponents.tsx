import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    Chip,
    Paper,
    LinearProgress,
    Skeleton,
    keyframes,
} from "@mui/material";
import { TrendingUp, Person, ArrowForward, Star, CheckCircle, FavoriteRounded } from "@mui/icons-material";

// 🎨 **1. GLASSMORPHISM** - ที่นิยมมากในปี 2024-2025
export const GlassmorphismCard = ({ children, ...props }: any) => (
    <Card
        sx={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            ...props.sx,
        }}
        {...props}
    >
        {children}
    </Card>
);

// 🌈 **2. GRADIENT CARDS** - สีไล่โทนสวย
export const GradientCard = ({ gradient = "primary", children, ...props }: any) => {
    const gradients = {
        primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        sunset: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        ocean: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        forest: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        orange: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    };

    return (
        <Card
            sx={{
                background: gradients[gradient as keyof typeof gradients] || gradients.primary,
                color: "white",
                borderRadius: 4,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
                },
                ...props.sx,
            }}
            {...props}
        >
            {children}
        </Card>
    );
};

// ✨ **3. NEUMORPHISM** - สไตล์นูน-เว้า
export const NeumorphismCard = ({ children, ...props }: any) => (
    <Card
        sx={{
            background: "#f0f0f3",
            borderRadius: 3,
            border: "none",
            boxShadow: "9px 9px 16px #d1d1d4, -9px -9px 16px #ffffff",
            transition: "all 0.3s ease",
            "&:hover": {
                boxShadow: "inset 9px 9px 16px #d1d1d4, inset -9px -9px 16px #ffffff",
            },
            ...props.sx,
        }}
        {...props}
    >
        {children}
    </Card>
);

// 🎭 **4. ANIMATED FLOATING BUTTON**
const floatingAnimation = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
`;

export const FloatingActionButton = ({ icon, label, ...props }: any) => (
    <Button
        variant="contained"
        startIcon={icon}
        sx={{
            background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
            borderRadius: 8,
            px: 3,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 10px 30px rgba(255, 107, 107, 0.3)",
            animation: `${floatingAnimation} 3s ease-in-out infinite`,
            "&:hover": {
                background: "linear-gradient(45deg, #FF5722, #009688)",
                transform: "scale(1.05)",
                boxShadow: "0 15px 40px rgba(255, 107, 107, 0.4)",
            },
            ...props.sx,
        }}
        {...props}
    >
        {label}
    </Button>
);

// 🌟 **5. MICRO-INTERACTIONS** - อนิเมชั่นเล็กๆ ที่ตอบสนอง
export const InteractiveCard = ({ children, ...props }: any) => (
    <Card
        sx={{
            borderRadius: 3,
            transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
            cursor: "pointer",
            "&:hover": {
                transform: "translateY(-12px) scale(1.02)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                "& .card-icon": {
                    transform: "rotate(360deg) scale(1.2)",
                    color: "#4ECDC4",
                },
                "& .card-button": {
                    transform: "translateX(10px)",
                },
            },
            ...props.sx,
        }}
        {...props}
    >
        {children}
    </Card>
);

// 📱 **6. MOBILE-FIRST RESPONSIVE CARDS**
export const ResponsiveCard = ({ title, subtitle, value, icon, ...props }: any) => (
    <GradientCard gradient="ocean" sx={{ p: 0, overflow: "hidden" }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Avatar
                    sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        width: { xs: 40, md: 56 },
                        height: { xs: 40, md: 56 },
                    }}
                >
                    {icon}
                </Avatar>
                <Box textAlign="right">
                    <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
                        {value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {subtitle}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="h6" fontWeight="600">
                {title}
            </Typography>
        </CardContent>
    </GradientCard>
);

// 🎯 **7. PROGRESS INDICATORS** - แสดงความคืบหน้าแบบสวย
export const ModernProgressCard = ({ title, progress, ...props }: any) => (
    <Card sx={{ borderRadius: 3, p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight="600">
                {title}
            </Typography>
            <Chip label={`${progress}%`} color="primary" size="small" sx={{ fontWeight: "bold" }} />
        </Box>
        <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
                height: 8,
                borderRadius: 4,
                "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #4ECDC4, #44A08D)",
                },
            }}
        />
    </Card>
);

// 🔥 **8. SKELETON LOADING** - แสดงขณะโหลด
export const ModernSkeleton = () => (
    <Card sx={{ p: 3, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
            <Skeleton variant="circular" width={56} height={56} sx={{ mr: 2 }} />
            <Box flex={1}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="40%" height={20} />
            </Box>
        </Box>
        <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2, mb: 2 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
    </Card>
);

// 🎨 **9. DARK MODE COMPONENTS**
export const DarkModeCard = ({ children, ...props }: any) => (
    <Card
        sx={{
            background: "linear-gradient(135deg, #2D3748 0%, #1A202C 100%)",
            color: "white",
            borderRadius: 3,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            ...props.sx,
        }}
        {...props}
    >
        {children}
    </Card>
);

// 💳 **10. PAYMENT CARD DESIGN** - สำหรับการชำระเงิน
export const PaymentCard = ({ method, selected, onClick, ...props }: any) => (
    <Paper
        elevation={selected ? 8 : 2}
        onClick={onClick}
        sx={{
            p: 3,
            borderRadius: 3,
            cursor: "pointer",
            transition: "all 0.3s ease",
            border: selected ? "2px solid #4ECDC4" : "2px solid transparent",
            background: selected ? "linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(255, 255, 255, 1))" : "white",
            "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
            },
            ...props.sx,
        }}
    >
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: "#4ECDC4", mr: 2 }}>{method.icon}</Avatar>
                <Box>
                    <Typography variant="h6" fontWeight="600">
                        {method.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {method.description}
                    </Typography>
                </Box>
            </Box>
            {selected && <CheckCircle sx={{ color: "#4ECDC4" }} />}
        </Box>
    </Paper>
);

// 📊 **11. STATS CARD** - แสดงสถิติ
export const StatsCard = ({ title, value, change, trend, icon }: any) => (
    <GlassmorphismCard sx={{ p: 3, height: "100%" }}>
        <Box display="flex" alignItems="start" justifyContent="space-between" mb={2}>
            <Avatar
                sx={{
                    bgcolor: trend === "up" ? "#4ECDC4" : "#FF6B6B",
                    width: 48,
                    height: 48,
                }}
            >
                {icon}
            </Avatar>
            <Box display="flex" alignItems="center">
                <TrendingUp
                    sx={{
                        color: trend === "up" ? "#4ECDC4" : "#FF6B6B",
                        transform: trend === "down" ? "rotate(180deg)" : "none",
                        mr: 0.5,
                    }}
                />
                <Typography variant="body2" sx={{ color: trend === "up" ? "#4ECDC4" : "#FF6B6B", fontWeight: "bold" }}>
                    {change}
                </Typography>
            </Box>
        </Box>
        <Typography variant="h4" fontWeight="bold" mb={1}>
            {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {title}
        </Typography>
    </GlassmorphismCard>
);

// 🎪 **DEMO COMPONENT** - แสดงตัวอย่างทั้งหมด
export const ModernDesignShowcase = () => {
    return (
        <Box sx={{ p: 4, background: "#f5f7fa", minHeight: "100vh" }}>
            <Typography variant="h3" fontWeight="bold" mb={4} textAlign="center">
                🎨 Modern Design Components 2025
            </Typography>

            {/* Row 1: Cards */}
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }} gap={3} mb={4}>
                <GlassmorphismCard sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" mb={2}>
                        🔮 Glassmorphism
                    </Typography>
                    <Typography variant="body2">Transparent glass effect with backdrop blur</Typography>
                </GlassmorphismCard>

                <GradientCard gradient="sunset" sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" mb={2}>
                        🌅 Gradient Cards
                    </Typography>
                    <Typography variant="body2">Beautiful color gradients with hover effects</Typography>
                </GradientCard>

                <NeumorphismCard sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" mb={2}>
                        🎭 Neumorphism
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Soft UI with embossed/debossed effects
                    </Typography>
                </NeumorphismCard>
            </Box>

            {/* Row 2: Interactive Elements */}
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }} gap={3} mb={4}>
                <InteractiveCard sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Typography variant="h6" fontWeight="600" mb={1}>
                                🎯 Interactive Card
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Hover to see micro-interactions
                            </Typography>
                        </Box>
                        <ArrowForward className="card-button" sx={{ transition: "all 0.3s ease" }} />
                    </Box>
                    <Star
                        className="card-icon"
                        sx={{
                            fontSize: 40,
                            color: "#FFD700",
                            transition: "all 0.5s ease",
                            mt: 2,
                        }}
                    />
                </InteractiveCard>

                <ResponsiveCard title="Responsive Design" subtitle="Mobile First" value="100%" icon={<Person />} />
            </Box>

            {/* Row 3: Progress & Stats */}
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }} gap={3} mb={4}>
                <ModernProgressCard title="Project Progress" progress={75} />
                <StatsCard title="Total Revenue" value="$12,450" change="+12.5%" trend="up" icon={<TrendingUp />} />
                <ModernSkeleton />
            </Box>

            {/* Row 4: Buttons & Actions */}
            <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center" mb={4}>
                <FloatingActionButton icon={<FavoriteRounded />} label="Floating Button" />
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 8,
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        px: 4,
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                        "&:hover": {
                            background: "linear-gradient(45deg, #764ba2, #667eea)",
                            transform: "translateY(-2px)",
                        },
                    }}
                >
                    🚀 Modern Button
                </Button>
            </Box>

            {/* Row 5: Dark Mode */}
            <DarkModeCard sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" fontWeight="600" mb={2}>
                    🌙 Dark Mode Ready
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    All components support dark mode themes
                </Typography>
            </DarkModeCard>
        </Box>
    );
};

export default ModernDesignShowcase;
