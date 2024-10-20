// app/home/_layout.tsx
import { Tabs, usePathname } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Import thư viện biểu tượng
import { appColors } from '@/constants/appColor';

const renderTabIcon = (iconName: string, focused: boolean, size: number) => {
  const color = focused ? appColors.activeIcon : appColors.gray;

  if (iconName === 'chatbubble-ellipses-outline') {
    return <Ionicons name={iconName} size={size} color={color} />;
  } else if (iconName === 'search') {
    return <MaterialIcons name={iconName} size={size} color={color} />;
  } else if (iconName === 'person-outline') {
    return <Ionicons name={iconName} size={size} color={color} />;
  }
  return null;
};

export default function HomeLayout() {
  const pathname = usePathname();
  console.log("path name now", pathname);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: pathname.startsWith('/message/') 
          // && !pathname.includes('/index') 
          ? 'none' : 'flex',
        },
        headerShown: false,
        tabBarActiveTintColor: appColors.activeIcon, // Màu sắc cho nhãn khi active
        tabBarInactiveTintColor: appColors.gray, // Màu sắc cho nhãn khi inactive
      }}
    >
      <Tabs.Screen 
        name="message" 
        options={{
          tabBarLabel: 'Messages', // Nhãn cho tab
          tabBarIcon: ({ size, focused }) => renderTabIcon('chatbubble-ellipses-outline', focused, size),
        }} 
      />
      <Tabs.Screen 
        name="search"  
        options={{
          tabBarLabel: 'Search', // Nhãn cho tab
          tabBarIcon: ({ size, focused }) => renderTabIcon('search', focused, size),
        }} 
      />
      <Tabs.Screen 
        name="user"  // Đặt tab user ở cuối cùng
        options={{
          tabBarLabel: 'User', // Nhãn cho tab
          tabBarIcon: ({ size, focused }) => renderTabIcon('person-outline', focused, size),
        }} 
      />
    </Tabs>
  );
}
