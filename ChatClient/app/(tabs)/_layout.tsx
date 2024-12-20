// app/home/_layout.tsx
import { Tabs, usePathname, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'; // Import thư viện biểu tượng
import { appColors } from '@/constants/appColor';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

const renderTabIcon = (iconName: string, focused: boolean, size: number) => {
  const color = focused ? appColors.activeIcon : appColors.gray;

  if (iconName === 'chatbubble-ellipses-outline') {
    return <Ionicons name={iconName} size={size} color={color} />;
  } else if (iconName === 'search') {
    return <MaterialIcons name={iconName} size={size} color={color} />;
  } else if (iconName === 'setting') {
    return <AntDesign name={iconName} size={size} color={color} />;
  }
  return null;
};

export default function HomeLayout() {
  const pathname = usePathname();
  
  useEffect(() => {
    return () => {}
}, [pathname.toString()])
  return (
    <Tabs
      // screenOptions={{
      //   tabBarStyle: {
      //   //  display: pathname.startsWith('/message/') || pathname.startsWith('/setting/user') 
      //   //   // // && !pathname.includes('/index') 
      //   //    ? 'none' : 'flex',
      //   },
      //   headerShown: false,
      //   tabBarActiveTintColor: appColors.activeIcon, // Màu sắc cho nhãn khi active
      //   tabBarInactiveTintColor: appColors.gray, // Màu sắc cho nhãn khi inactive
      // }}
      
      
      screenOptions={({ route }) => ({

        headerShown: false,
        tabBarActiveTintColor: appColors.activeIcon, // Màu sắc cho nhãn khi active
        tabBarInactiveTintColor: appColors.gray, // Màu sắc cho nhãn khi inactive
      })}
    >
      <Tabs.Screen 
        
        name="message" 
        
        options={({ route }) =>({
          tabBarStyle:{
            display: pathname.length > 8 ?'none': 'flex',
            
            
          },
          
          tabBarLabel: 'Messages', // Nhãn cho tab
          tabBarIcon: ({ size, focused }) => renderTabIcon('chatbubble-ellipses-outline', focused, size),
        })} 
      
      />
      <Tabs.Screen 
        name="search"  
        options={{
          tabBarLabel: 'Search', // Nhãn cho tab
          tabBarIcon: ({ size, focused }) => renderTabIcon('search', focused, size),
        }} 
      />
      <Tabs.Screen 
        name="setting"  // Đặt tab user ở cuối cùng
        options={{
          tabBarLabel: 'Setting', // Nhãn cho tab
          tabBarIcon: ({ size, focused }) => renderTabIcon('setting', focused, size),
        }} 
      />
    </Tabs>
  );
}
